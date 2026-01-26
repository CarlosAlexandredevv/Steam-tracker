"use server"

import { env } from "@/env";

interface SteamPlayer {
   steamid: string;
   communityvisibilitystate: number;
   profilestate: number;
   personaname: string;
   commentpermission: number;
   profileurl: string;
   avatar: string;
   avatarmedium: string;
   avatarfull: string;
   avatarhash: string;
   lastlogoff: number;
   personastate: number;
   primaryclanid: string;
   timecreated: number;
   personastateflags: number;
}

export async function getUserById(id: string): Promise<SteamPlayer | null> {
 try{
  const user =  await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${id}`)

  const userData = await user.json()
  return userData.response.players[0]
 } catch (error: unknown) {
    console.error(error);
    return null;
 }
}