'use server';

import { env } from '@/env';
import { SteamOwnedGame } from '@/types/steam';

export async function getGameBySteamIdAppId(steamId: string, appId: string) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&appids=${appId}&include_played_free_games=1
`,
    );
    const data = await response.json();

    const gameFiltered = data.response.games.find(
      (game: SteamOwnedGame) => game.appid === Number(appId),
    );

    return gameFiltered;
  } catch (error) {
    console.error(error);
    return null;
  }
}
