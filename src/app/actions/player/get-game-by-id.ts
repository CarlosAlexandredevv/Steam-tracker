'use server';
import { SteamGameDataResponse, SteamGameData } from '@/types/steam';

export async function getGameById(
  gameId: string,
): Promise<SteamGameData | null> {
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${gameId}&l=portuguese`,
    );

    const jsonData: Record<string, SteamGameDataResponse> =
      await response?.json();
    const gameData = jsonData[gameId];

    if (!gameData?.success || !gameData?.data) {
      return null;
    }

    const gameWithHero = {
      ...gameData.data,
      imgHero: `https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/library_hero.jpg`,
    };

    return gameWithHero;
  } catch (error) {
    console.error(error);
    return null;
  }
}
