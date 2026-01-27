'use server';

import { env } from '@/env';
import { SteamGetFriendsListResponse, SteamPlayer } from '@/types/steam';
import { getPlayerById } from './get-player-by-id';

export async function getAllFriendsPlayer(steamId: string) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&relationship=friend`,
    );

    const data: SteamGetFriendsListResponse = await response.json();

    const playersData = data.friendslist.friends.map(async (friend) => {
      const player = await getPlayerById(friend.steamid);
      return player;
    });

    const players: (SteamPlayer | null)[] = await Promise.all(playersData);

    return players;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
}
