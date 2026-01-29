'use server';

import { env } from '@/env';
import {
  GetPlayedFriendsResponse,
  PlayedFriend,
  SteamGetFriendsListResponse,
  SteamGetPlayerSummariesResponse,
  SteamOwnedGame,
  SteamPlayer,
} from '@/types/steam';
import { getGameBySteamIdAppId } from './get-game-by-steam-id-app-id';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi } from '@/lib/steam-api';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function chunkedMap<T, R>(
  items: readonly T[],
  chunkSize: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(mapper));
    results.push(...chunkResults);
  }
  return results;
}

async function fetchPlayedFriends(
  steamId: string,
  appId: string,
): Promise<GetPlayedFriendsResponse | null> {
  try {
    const friends = await fetchSteamApi(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
    );

    const friendsData = await safeJsonParse<SteamGetFriendsListResponse>(
      friends,
    );

    if (!friendsData) {
      return null;
    }

    const allFriendIds =
      friendsData?.friendslist?.friends?.map((f) => f.steamid) ?? [];

    // Limita quantos amigos verificamos para evitar dezenas de chamadas à API Steam.
    const MAX_FRIENDS_TO_CHECK = 30;
    const friendIds = allFriendIds.slice(0, MAX_FRIENDS_TO_CHECK);

    // Consulta jogos por amigo em chunks pra não explodir rate limit.
    const gamesByFriendId = await chunkedMap(
      friendIds,
      10,
      async (
        friendSteamId,
      ): Promise<{ steamid: string; game: SteamOwnedGame | null }> => {
        const game = await getGameBySteamIdAppId(friendSteamId, appId);
        return { steamid: friendSteamId, game: game ?? null };
      },
    );

    const played = gamesByFriendId
      .filter(({ game }) => !!game && (game?.playtime_forever ?? 0) > 0)
      .map(({ steamid, game }) => ({
        steamid,
        playtime_forever: (game?.playtime_forever ?? 0) as number,
      }));

    if (played.length === 0) {
      return { count: 0, friends: [] };
    }

    // GetPlayerSummaries aceita no máximo 100 steamids por request — buscar em batches.
    const BATCH_SIZE = 100;
    const playedIds = played.map((p) => p.steamid);
    const players: SteamPlayer[] = [];
    for (let i = 0; i < playedIds.length; i += BATCH_SIZE) {
      const chunk = playedIds.slice(i, i + BATCH_SIZE);
      const summariesRes = await fetchSteamApi(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${chunk.join(',')}`,
      );
      const summariesData = await safeJsonParse<SteamGetPlayerSummariesResponse>(
        summariesRes,
      );
      if (summariesData?.response?.players?.length) {
        players.push(...(summariesData.response.players as SteamPlayer[]));
      }
    }

    if (players.length === 0) {
      return null;
    }
    const playerById = new Map(players.map((p) => [p.steamid, p] as const));

    const friendsPlayed: PlayedFriend[] = played
      .map(({ steamid, playtime_forever }) => {
        const p = playerById.get(steamid);
        if (!p) return null;
        return {
          steamid,
          personaname: p.personaname,
          avatar: p.avatar,
          avatarmedium: p.avatarmedium,
          avatarfull: p.avatarfull,
          playtime_forever,
        };
      })
      .filter((x): x is PlayedFriend => x !== null)
      .sort((a, b) => b.playtime_forever - a.playtime_forever);

    return { count: friendsPlayed.length, friends: friendsPlayed };
  } catch (error: unknown) {
    logActionFailure('getPlayedFriends', { steamId, appId }, error);
    return null;
  }
}

export async function getPlayedFriends(
  steamId: string,
  appId: string,
): Promise<GetPlayedFriendsResponse | null> {
  return withActionLog('getPlayedFriends', { steamId, appId }, () =>
    fetchPlayedFriends(steamId, appId),
  );
}
