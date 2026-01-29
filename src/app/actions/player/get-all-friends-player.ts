'use server';

import { env } from '@/env';
import { SteamGetFriendsListResponse, SteamPlayer } from '@/types/steam';
import { getPlayersByIds } from './get-player-by-id';
import { safeJsonParse } from '@/lib/utils';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function fetchAllFriendsPlayer(steamId: string) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
      { cache: 'no-store' },
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

export async function getAllFriendsPlayer(steamId: string) {
  return withActionLog('getAllFriendsPlayer', { steamId }, () =>
    fetchAllFriendsPlayer(steamId),
  );
}
