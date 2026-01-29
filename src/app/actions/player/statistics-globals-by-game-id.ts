'use server';

import { unstable_cache } from 'next/cache';
import type {
  SteamCurrentPlayersResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
} from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';

async function fetchStatisticsGlobalsByGameId(appId: string) {
  try {
    const [playersNowRes, achivementsGlobalRes] = await Promise.all([
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`,
      ),
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appId}&l=portuguese`,
      ),
    ]);

    const [playersNowData, achivementsGlobalData] = await Promise.all([
      safeJsonParse<SteamCurrentPlayersResponse>(playersNowRes),
      safeJsonParse<SteamGetGlobalAchievementPercentagesForAppResponse>(
        achivementsGlobalRes,
      ),
    ]);

    if (!playersNowData || !achivementsGlobalData) {
      return null;
    }

    return {
      playersNowData,
      achivementsGlobalData,
    };
  } catch {
    return null;
  }
}

function getCachedStatisticsGlobalsByGameId(appId: string) {
  return unstable_cache(
    () => fetchStatisticsGlobalsByGameId(appId),
    ['statisticsGlobalsByGameId', appId],
    { revalidate: CACHE_REVALIDATE.statistics },
  )();
}

export async function statisticsGlobalsByGameId(appId: string) {
  return getCachedStatisticsGlobalsByGameId(appId);
}
