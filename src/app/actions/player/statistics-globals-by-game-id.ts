'use server';

import type {
  SteamCurrentPlayersResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
} from '@/types/steam';

export async function statisticsGlobalsByGameId(appId: string) {
  try {
    const playersNow = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`,
    );
    const playersNowData: SteamCurrentPlayersResponse = await playersNow.json();

    const achivementsGlobal = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appId}&l=portuguese`,
    );

    const achivementsGlobalData: SteamGetGlobalAchievementPercentagesForAppResponse =
      await achivementsGlobal.json();

    return {
      playersNowData,
      achivementsGlobalData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
