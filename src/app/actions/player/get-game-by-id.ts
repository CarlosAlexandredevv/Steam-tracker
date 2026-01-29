'use server';
import { unstable_cache } from 'next/cache';
import { SteamGameDataResponse, SteamGameData } from '@/types/steam';
import { getImageUrlWithFallback, safeJsonParse } from '@/lib/utils';

async function fetchGameById(gameId: string): Promise<SteamGameData | null> {
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${gameId}&l=portuguese`,
    );

    const jsonData = await safeJsonParse<Record<string, SteamGameDataResponse>>(response);
    
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
    console.error(error);
    return null;
  }
}

export async function getGameById(
  gameId: string,
): Promise<SteamGameData | null> {
  return unstable_cache(async () => fetchGameById(gameId), [`game-${gameId}`], {
    revalidate: 3600, // 1 hora (dados do jogo mudam muito pouco)
    tags: [`game-${gameId}`],
  })();
}
