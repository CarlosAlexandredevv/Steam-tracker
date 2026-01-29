'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import { SteamOwnedGame } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';

async function fetchGameBySteamIdAppId(steamId: string, appId: string) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&appids=${appId}&include_played_free_games=1
`,
    );
    const data = await safeJsonParse<{ response?: { games?: SteamOwnedGame[] } }>(response);
    
    if (!data) {
      return null;
    }

    const gameFiltered = data.response?.games?.find(
      (game: SteamOwnedGame) => game.appid === Number(appId),
    );

    return gameFiltered;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGameBySteamIdAppId(steamId: string, appId: string) {
  return unstable_cache(
    async () => fetchGameBySteamIdAppId(steamId, appId),
    [`game-user-${steamId}-${appId}`],
    {
      revalidate: 300, // 5 minutos
      tags: [`game-user-${steamId}-${appId}`],
    },
  )();
}
