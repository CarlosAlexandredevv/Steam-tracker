'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import {
  SteamGetPlayerAchievementsResponse,
  SteamPlayerAchievement,
  SteamGetSchemaForGameResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
  SteamSchemaAchievement,
} from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi, CACHE_REVALIDATE } from '@/lib/steam-api';

interface SchemaAndGlobal {
  schemaAchievements: SteamSchemaAchievement[];
  percentByApiName: Record<string, number | string>;
}

async function fetchSchemaAndGlobalForGame(
  appId: string,
): Promise<SchemaAndGlobal | null> {
  try {
    const [response2, response3] = await Promise.all([
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${env.STEAM_API_KEY}&appid=${appId}&l=portuguese`,
      ),
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appId}&l=portuguese`,
      ),
    ]);

    const [data2, data3] = await Promise.all([
      safeJsonParse<SteamGetSchemaForGameResponse>(response2),
      safeJsonParse<SteamGetGlobalAchievementPercentagesForAppResponse>(
        response3,
      ),
    ]);

    if (!data2?.game?.availableGameStats) {
      return null;
    }

    const schemaAchievements =
      data2.game.availableGameStats?.achievements ?? [];
    const percentByApiName = Object.fromEntries(
      (data3?.achievementpercentages?.achievements ?? []).map((a) => [
        a.name,
        a.percent,
      ]),
    ) as Record<string, number | string>;

    return { schemaAchievements, percentByApiName };
  } catch {
    return null;
  }
}

function getCachedSchemaAndGlobal(appId: string) {
  return unstable_cache(
    () => fetchSchemaAndGlobalForGame(appId),
    ['getSchemaAndGlobalForGame', appId],
    { revalidate: CACHE_REVALIDATE.achievements },
  )();
}

async function fetchPlayerAchievementsRaw(
  id: string,
  appId: string,
): Promise<SteamGetPlayerAchievementsResponse | null> {
  try {
    const response = await fetchSteamApi(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${env.STEAM_API_KEY}&steamid=${id}&appid=${appId}&l=portuguese`,
    );
    return safeJsonParse<SteamGetPlayerAchievementsResponse>(response);
  } catch {
    return null;
  }
}

function getCachedPlayerAchievementsRaw(id: string, appId: string) {
  return unstable_cache(
    () => fetchPlayerAchievementsRaw(id, appId),
    ['getPlayerAchievementsRaw', id, appId],
    { revalidate: CACHE_REVALIDATE.achievements },
  )();
}

function mergeWithSchema(
  data: SteamGetPlayerAchievementsResponse | null,
  schemaAndGlobal: SchemaAndGlobal | null,
): SteamPlayerAchievement[] | null {
  if (!data?.playerstats?.achievements || !schemaAndGlobal) {
    return null;
  }

  const { schemaAchievements, percentByApiName } = schemaAndGlobal;

  const withImages =
    data.playerstats.achievements.map((achievement) => {
      const match = schemaAchievements.find(
        (schema) => schema.name === achievement.apiname,
      );

      return {
        ...achievement,
        name: match?.displayName ?? achievement.name,
        percent: percentByApiName[achievement.apiname],
        icon: match?.icon,
        icongray: match?.icongray,
      };
    }) ?? [];

  return withImages;
}

export async function getAchivementsById(
  id: string,
  appId: string,
): Promise<SteamPlayerAchievement[] | null> {
  const [schemaAndGlobal, playerData] = await Promise.all([
    getCachedSchemaAndGlobal(appId),
    getCachedPlayerAchievementsRaw(id, appId),
  ]);

  return mergeWithSchema(playerData, schemaAndGlobal);
}
