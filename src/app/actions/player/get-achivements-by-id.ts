'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import {
  SteamGetPlayerAchievementsResponse,
  SteamPlayerAchievement,
  SteamGetSchemaForGameResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
} from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

async function fetchAchivementsById(
  id: string,
  appId: string,
): Promise<SteamPlayerAchievement[] | null> {
  try {
    const [response, response2, response3] = await Promise.all([
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${env.STEAM_API_KEY}&steamid=${id}&appid=${appId}&l=portuguese`,
      ),
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${env.STEAM_API_KEY}&steamid=${id}&appid=${appId}&l=portuguese`,
      ),
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appId}&l=portuguese`,
      ),
    ]);

    const [data, data2, data3] = await Promise.all([
      safeJsonParse<SteamGetPlayerAchievementsResponse>(response),
      safeJsonParse<SteamGetSchemaForGameResponse>(response2),
      safeJsonParse<SteamGetGlobalAchievementPercentagesForAppResponse>(
        response3,
      ),
    ]);

    if (!data || !data2) {
      return null;
    }
    const schemaAchievements =
      data2.game.availableGameStats?.achievements ?? [];

    const percentByApiName = new Map(
      (data3?.achievementpercentages?.achievements ?? []).map((a) => [
        a.name,
        a.percent,
      ]),
    );

    const withImages =
      data.playerstats?.achievements?.map((achievement) => {
        const match = schemaAchievements.find(
          (schema) => schema.name === achievement.apiname,
        );

        return {
          ...achievement,
          name: match?.displayName ?? achievement.name,
          percent: percentByApiName.get(achievement.apiname),
          icon: match?.icon,
          icongray: match?.icongray,
        };
      }) ?? [];

    return withImages;
  } catch (error) {
    logActionFailure('getAchivementsById', { id, appId }, error);
    return null;
  }
}

function getCachedAchivementsById(id: string, appId: string) {
  return unstable_cache(
    () => fetchAchivementsById(id, appId),
    ['getAchivementsById', id, appId],
    { revalidate: CACHE_REVALIDATE.achievements },
  )();
}

export async function getAchivementsById(
  id: string,
  appId: string,
): Promise<SteamPlayerAchievement[] | null> {
  return withActionLog('getAchivementsById', { id, appId }, () =>
    getCachedAchivementsById(id, appId),
  );
}
