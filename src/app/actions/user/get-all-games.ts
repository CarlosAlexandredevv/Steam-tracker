'use server';

import { env } from '@/env';
import { SteamOwnedGame } from '@/types/steam';

export interface SteamOwnedGamesApiResponse {
  response: {
    game_count: number;
    games: SteamOwnedGame[];
  };
}

export async function getAllGames(
  steamId: string,
): Promise<SteamOwnedGame[] | null> {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true`,
    );
    const data: SteamOwnedGamesApiResponse = await response?.json();
    const gamesWithImages: SteamOwnedGame[] = data?.response?.games?.map(
      (game) => ({
        ...game,
        hero: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/library_hero.jpg`,
        banner: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
        horizontal: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/capsule_616x353.jpg`,
        vertical: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`,
      }),
    );

    return gamesWithImages;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
