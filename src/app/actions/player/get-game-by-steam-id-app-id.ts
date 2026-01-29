'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import { SteamOwnedGame } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function fetchGameBySteamIdAppId(steamId: string, appId: string) {
  try {
    const response = await fetchSteamApi(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&appids=${appId}&include_played_free_games=1`,
    );
    const data = await safeJsonParse<{
      response?: { games?: SteamOwnedGame[] };
    }>(response);

    if (!data) {
      return null;
    }

    const gameFiltered = data.response?.games?.find(
      (game: SteamOwnedGame) => game.appid === Number(appId),
    );

    return gameFiltered;
  } catch (error) {
    logActionFailure('getGameBySteamIdAppId', { steamId, appId }, error);
    return null;
  }
}

function getCachedGameBySteamIdAppId(steamId: string, appId: string) {
  return unstable_cache(
    () => fetchGameBySteamIdAppId(steamId, appId),
    ['game-by-steam-app', steamId, appId],
    { revalidate: CACHE_REVALIDATE.games },
  )();
}

export async function getGameBySteamIdAppId(steamId: string, appId: string) {
  return withActionLog('getGameBySteamIdAppId', { steamId, appId }, () =>
    getCachedGameBySteamIdAppId(steamId, appId),
  );
}
