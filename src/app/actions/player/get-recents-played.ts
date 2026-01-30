'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import type {
  SteamRecentlyPlayedGame,
  SteamRecentlyPlayedApiResponse,
} from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';

function getSteamCdnUrls(appid: number) {
  const base = `https://cdn.akamai.steamstatic.com/steam/apps/${appid}`;
  return {
    hero: `${base}/library_hero.jpg`,
    banner: `${base}/header.jpg`,
    horizontal: `${base}/capsule_616x353.jpg`,
    vertical: `${base}/library_600x900.jpg`,
  };
}

async function fetchRecentlyPlayedGames(
  steamId: string,
  count = 20,
): Promise<SteamRecentlyPlayedGame[] | null> {
  try {
    const response = await fetchSteamApi(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&count=${count}`,
    );

    const data = await safeJsonParse<SteamRecentlyPlayedApiResponse>(response);

    if (!data?.response?.games?.length) {
      return null;
    }

    return data.response.games.map((game) => {
      const urls = getSteamCdnUrls(game.appid);
      return {
        ...game,
        hero: urls.hero,
        banner: urls.banner,
        horizontal: urls.horizontal,
        vertical: urls.vertical,
      };
    });
  } catch {
    return null;
  }
}

function getCachedRecentlyPlayedGames(steamId: string) {
  return unstable_cache(
    () => fetchRecentlyPlayedGames(steamId),
    ['recentlyPlayedGames', steamId],
    { revalidate: CACHE_REVALIDATE.recentlyPlayed },
  )();
}

export async function getRecentlyPlayedGames(
  steamId: string,
): Promise<SteamRecentlyPlayedGame[] | null> {
  return getCachedRecentlyPlayedGames(steamId);
}
