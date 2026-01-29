'use server';

import { env } from '@/env';
import { SteamOwnedGame } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function fetchGameBySteamIdAppId(steamId: string, appId: string) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&appids=${appId}&include_played_free_games=1`,
      { cache: 'no-store' },
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

export async function getGameBySteamIdAppId(steamId: string, appId: string) {
  return withActionLog('getGameBySteamIdAppId', { steamId, appId }, () =>
    fetchGameBySteamIdAppId(steamId, appId),
  );
}
