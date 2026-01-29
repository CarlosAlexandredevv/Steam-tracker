'use server';

import { unstable_cache } from 'next/cache';
import type {
  SteamCurrentPlayersResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
} from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';

async function fetchStatisticsGlobalsByGameId(appId: string) {
  try {
    const playersNow = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`,
    );
    const playersNowData = await safeJsonParse<SteamCurrentPlayersResponse>(playersNow);

    const achivementsGlobal = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appId}&l=portuguese`,
    );

    const achivementsGlobalData = await safeJsonParse<SteamGetGlobalAchievementPercentagesForAppResponse>(achivementsGlobal);

    if (!playersNowData || !achivementsGlobalData) {
      return null;
    }

    return {
      playersNowData,
      achivementsGlobalData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function statisticsGlobalsByGameId(appId: string) {
  return unstable_cache(
    async () => fetchStatisticsGlobalsByGameId(appId),
    [`statistics-global-${appId}`],
    {
      revalidate: 60, // 1 minuto (estatísticas globais mudam frequentemente)
      tags: [`statistics-global-${appId}`],
    },
  )();
}
