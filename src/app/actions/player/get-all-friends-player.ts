'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import { SteamGetFriendsListResponse, SteamPlayer } from '@/types/steam';
import { getPlayerById } from './get-player-by-id';
import { safeJsonParse } from '@/lib/utils';

async function fetchAllFriendsPlayer(steamId: string) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
    );

    const data = await safeJsonParse<SteamGetFriendsListResponse>(response);

    const friends = data?.friendslist?.friends ?? [];

    const playersData = friends.map(async (friend) => {
      const player = await getPlayerById(friend.steamid);
      return player;
    });

    const players: (SteamPlayer | null)[] = await Promise.all(playersData);

    return players.filter((player): player is SteamPlayer => player !== null);
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
}

export async function getAllFriendsPlayer(steamId: string) {
  return unstable_cache(
    async () => fetchAllFriendsPlayer(steamId),
    [`friends-${steamId}`],
    {
      revalidate: 300, // 5 minutos
      tags: [`friends-${steamId}`],
    },
  )();
}
