'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import { SteamOwnedGame } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

export interface SteamOwnedGamesApiResponse {
  response: {
    game_count: number;
    games: SteamOwnedGame[];
  };
}

/** URLs do CDN Steam são estáveis por appid — sem verificar cada uma (evita N×4 requests). */
function getSteamCdnUrls(appid: number) {
  const base = `https://cdn.akamai.steamstatic.com/steam/apps/${appid}`;
  return {
    hero: `${base}/library_hero.jpg`,
    banner: `${base}/header.jpg`,
    horizontal: `${base}/capsule_616x353.jpg`,
    vertical: `${base}/library_600x900.jpg`,
  };
}

async function fetchAllGames(
  steamId: string,
): Promise<SteamOwnedGame[] | null> {
  try {
    const response = await fetchSteamApi(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games=1`,
    );
    const data = await safeJsonParse<SteamOwnedGamesApiResponse>(response);

    if (!data?.response?.games) {
      return null;
    }

    const gamesWithUrls = data.response.games.map((game) => {
      const urls = getSteamCdnUrls(game.appid);
      return {
        ...game,
        hero: urls.hero,
        banner: urls.banner,
        horizontal: urls.horizontal,
        vertical: urls.vertical,
      };
    });

    return gamesWithUrls;
  } catch (error: unknown) {
    logActionFailure('getAllGames', { steamId }, error);
    return null;
  }
}

function getCachedAllGames(steamId: string) {
  return unstable_cache(
    () => fetchAllGames(steamId),
    ['getAllGames', steamId],
    { revalidate: CACHE_REVALIDATE.games },
  )();
}

export async function getAllGames(
  steamId: string,
): Promise<SteamOwnedGame[] | null> {
  return withActionLog('getAllGames', { steamId }, () =>
    getCachedAllGames(steamId),
  );
}
