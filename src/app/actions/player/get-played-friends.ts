'use server';

import { unstable_cache } from 'next/cache';
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
    const friends = await fetch(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
    );

    const friendsData: SteamGetFriendsListResponse = await friends.json();

    const friendIds =
      friendsData?.friendslist?.friends?.map((f) => f.steamid) ?? [];

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
      .filter(({ game }) => !!game && (game.playtime_forever ?? 0) > 0)
      .map(({ steamid, game }) => ({
        steamid,
        playtime_forever: (game?.playtime_forever ?? 0) as number,
      }));

    if (played.length === 0) {
      return { count: 0, friends: [] };
    }

    const summariesRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${
        env.STEAM_API_KEY
      }&steamids=${played.map((p) => p.steamid).join(',')}`,
    );

    const summariesData: SteamGetPlayerSummariesResponse =
      await summariesRes.json();
    const players = (summariesData?.response?.players ?? []) as SteamPlayer[];
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
    console.error(error);
    return null;
  }
}

export async function getPlayedFriends(
  steamId: string,
  appId: string,
): Promise<GetPlayedFriendsResponse | null> {
  return unstable_cache(
    async () => fetchPlayedFriends(steamId, appId),
    [`played-friends-${steamId}-${appId}`],
    {
      revalidate: 300, // 5 minutos
      tags: [`played-friends-${steamId}-${appId}`],
    },
  )();
}
