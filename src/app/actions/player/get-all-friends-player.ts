'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import { SteamGetFriendsListResponse, SteamPlayer } from '@/types/steam';
import { getPlayersByIds } from './get-player-by-id';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function fetchAllFriendsPlayer(steamId: string): Promise<SteamPlayer[]> {
  try {
    const response = await fetchSteamApi(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
    );

    const data = await safeJsonParse<SteamGetFriendsListResponse>(response);

    const friends = data?.friendslist?.friends ?? [];
    const steamIds = friends.map((f) => f.steamid);
    const players = await getPlayersByIds(steamIds);
    return players;
  } catch (error: unknown) {
    logActionFailure('getAllFriendsPlayer', { steamId }, error);
    return [];
  }
}

function getCachedAllFriendsPlayer(steamId: string) {
  return unstable_cache(
    () => fetchAllFriendsPlayer(steamId),
    ['getAllFriendsPlayer', steamId],
    { revalidate: CACHE_REVALIDATE.friends },
  )();
}

export async function getAllFriendsPlayer(steamId: string) {
  return withActionLog('getAllFriendsPlayer', { steamId }, () =>
    getCachedAllFriendsPlayer(steamId),
  );
}
