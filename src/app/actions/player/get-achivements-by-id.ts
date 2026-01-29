'use server';

import { env } from '@/env';
import {
  SteamGetPlayerAchievementsResponse,
  SteamPlayerAchievement,
  SteamGetSchemaForGameResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
} from '@/types/steam';

export async function getAchivementsById(
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

    const data2: SteamGetSchemaForGameResponse = await response2.json();
    const data3: SteamGetGlobalAchievementPercentagesForAppResponse =
      await response3.json();

    const data: SteamGetPlayerAchievementsResponse = await response.json();
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
