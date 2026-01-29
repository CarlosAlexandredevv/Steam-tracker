export interface SteamGlobalAchievementPercentage {
  name: string;
  percent: number | string;
}

export interface SteamAchievementPercentages {
  achievements: SteamGlobalAchievementPercentage[];
}

export interface SteamGetGlobalAchievementPercentagesForAppResponse {
  achievementpercentages: SteamAchievementPercentages;
}

export interface SteamSchemaAchievement {
  name: string;
  defaultvalue: number;
  displayName: string;
  hidden: number;
  icon: string;
  icongray: string;
}

export interface SteamAvailableGameStats {
  stats?: unknown;
  achievements: SteamSchemaAchievement[];
}

export interface SteamGameSchema {
  gameName: string;
  gameVersion: string;
  availableGameStats: SteamAvailableGameStats;
}

export interface SteamGetSchemaForGameResponse {
  game: SteamGameSchema;
}

export interface SteamPlayerAchievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
  name: string;
  description: string;
  icon?: string;
  icongray?: string;
  percent?: number | string;
}

export interface SteamPlayerStats {
  steamID: string;
  gameName: string;
  achievements: SteamPlayerAchievement[];
  success: boolean;
}

export interface SteamGetPlayerAchievementsResponse {
  playerstats: SteamPlayerStats;
}
