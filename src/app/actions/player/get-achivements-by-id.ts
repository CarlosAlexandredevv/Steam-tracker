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

async function fetchAchivementsById(
  id: string,
  appId: string,
): Promise<SteamPlayerAchievement[] | null> {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1//?key=${env.STEAM_API_KEY}&steamid=${id}&appid=${appId}&l=portuguese`,
    );

    const response2 = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${env.STEAM_API_KEY}&steamid=${id}&appid=${appId}&l=portuguese`,
    );

    const response3 = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appId}&l=portuguese`,
    );

    const data2 = await safeJsonParse<SteamGetSchemaForGameResponse>(response2);
    const data3 = await safeJsonParse<SteamGetGlobalAchievementPercentagesForAppResponse>(response3);
    const data = await safeJsonParse<SteamGetPlayerAchievementsResponse>(response);

    if (!data || !data2) {
      return null;
    }
    const schemaAchievements =
      data2.game.availableGameStats?.achievements ?? [];

    const percentByApiName = new Map(
      (data3.achievementpercentages?.achievements ?? []).map((a) => [
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
    console.error(error);
    return null;
  }
}

export async function getAchivementsById(
  id: string,
  appId: string,
): Promise<SteamPlayerAchievement[] | null> {
  return unstable_cache(
    async () => fetchAchivementsById(id, appId),
    [`achievements-${id}-${appId}`],
    {
      revalidate: 300, // 5 minutos
      tags: [`achievements-${id}-${appId}`],
    },
  )();
}
