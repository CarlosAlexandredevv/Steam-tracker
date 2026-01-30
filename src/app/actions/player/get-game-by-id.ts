'use server';

import { unstable_cache } from 'next/cache';
import { SteamGameDataResponse, SteamGameData } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';

const getHeroUrl = (gameId: string) =>
  `https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/library_hero.jpg`;

async function fetchGameById(gameId: string): Promise<SteamGameData | null> {
  try {
    const response = await fetchSteamApi(
      `https://store.steampowered.com/api/appdetails?appids=${gameId}&l=portuguese&cc=br`
,
    );

    const jsonData = await safeJsonParse<Record<string, SteamGameDataResponse>>(
      response,
    );

    if (!jsonData) {
      return null;
    }

    const gameData = jsonData[gameId];

    if (!gameData?.success || !gameData?.data) {
      return null;
    }

    const gameWithHero = {
      ...gameData.data,
      imgHero: getHeroUrl(gameId),
    };

    const removeImagesContainsHtml = {
      ...gameWithHero,
      imgHero: gameWithHero.imgHero?.replace(/<[^>]*>?/g, ''),
    };

    return removeImagesContainsHtml;
  } catch {
    return null;
  }
}

function getCachedGameById(gameId: string) {
  return unstable_cache(() => fetchGameById(gameId), ['getGameById', gameId], {
    revalidate: CACHE_REVALIDATE.gameDetails,
  })();
}

export async function getGameById(
  gameId: string,
): Promise<SteamGameData | null> {
  return getCachedGameById(gameId);
}
