export interface SteamRecentlyPlayedGame {
  appid: number;
  name: string;
  playtime_2weeks?: number;
  playtime_forever: number;
  img_icon_url?: string;
  hero?: string;
  banner?: string;
  horizontal?: string;
  vertical?: string;
}

export interface SteamRecentlyPlayedApiResponse {
  response: {
    total_count: number;
    games?: SteamRecentlyPlayedGame[];
  };
}
