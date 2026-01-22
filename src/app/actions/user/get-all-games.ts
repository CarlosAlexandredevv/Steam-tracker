'use server';

import { env } from "@/env";
import { decodeToken } from "@/lib/jwt";

export interface SteamOwnedGame {
  appid: number;
  name: string;
  playtime_2weeks?: number;
  playtime_forever: number;
  img_icon_url: string;
  has_community_visible_stats?: boolean;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: number;
  content_descriptorids?: number[];
  playtime_disconnected?: number;
  banner?: string;
  horizontal?: string;
  vertical?: string;
}

export interface SteamOwnedGamesApiResponse {
  response: {
    game_count: number;
    games: SteamOwnedGame[];
  };
}

export async function getAllGames() {
  try{
     const decoded = await decodeToken();
     
     if (!decoded) {
      return null;
     }

     const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${decoded.steamId}&include_appinfo=true`);
     const data: SteamOwnedGamesApiResponse = await response.json();
     const gamesWithImages: SteamOwnedGame[] = data.response.games.map((game) => ({
       ...game,
       banner: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
       horizontal: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/capsule_616x353.jpg`,
       vertical: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`,
      }));


     return gamesWithImages;
  } catch (error: unknown) {
    console.error(error);
    return null;
  } 
}