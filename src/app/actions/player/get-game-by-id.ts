'use server';

import { SteamGameDataResponse, SteamGameData } from '@/types/steam';
import { getImageUrlWithFallback, safeJsonParse } from '@/lib/utils';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function fetchGameById(gameId: string): Promise<SteamGameData | null> {
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${gameId}&l=portuguese`,
      { cache: 'no-store' },
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

    const heroUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/library_hero.jpg`;
    const verifiedHeroUrl = await getImageUrlWithFallback(heroUrl);

    const gameWithHero = {
      ...gameData.data,
      imgHero: verifiedHeroUrl,
    };

    const removeImagesContainsHtml = {
      ...gameWithHero,
      imgHero: gameWithHero.imgHero?.replace(/<[^>]*>?/g, ''),
    };

    return removeImagesContainsHtml;
  } catch (error) {
    logActionFailure('getGameById', { gameId }, error);
    return null;
  }
}

export async function getGameById(
  gameId: string,
): Promise<SteamGameData | null> {
  return withActionLog('getGameById', { gameId }, () => fetchGameById(gameId));
}
