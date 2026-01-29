'use server';

import type {
  SteamCurrentPlayersResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
} from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function fetchStatisticsGlobalsByGameId(appId: string) {
  try {
    const playersNow = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`,
      { cache: 'no-store' },
    );
    const playersNowData = await safeJsonParse<SteamCurrentPlayersResponse>(
      playersNow,
    );

    const achivementsGlobal = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appId}&l=portuguese`,
      { cache: 'no-store' },
    );

    const achivementsGlobalData =
      await safeJsonParse<SteamGetGlobalAchievementPercentagesForAppResponse>(
        achivementsGlobal,
      );

    if (!playersNowData || !achivementsGlobalData) {
      return null;
    }

    return {
      playersNowData,
      achivementsGlobalData,
    };
  } catch (error) {
    logActionFailure('statisticsGlobalsByGameId', { appId }, error);
    return null;
  }
}

export async function statisticsGlobalsByGameId(appId: string) {
  return withActionLog('statisticsGlobalsByGameId', { appId }, () =>
    fetchStatisticsGlobalsByGameId(appId),
  );
}
