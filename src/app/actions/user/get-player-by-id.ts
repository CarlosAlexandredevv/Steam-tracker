"use server"

import { env } from "@/env";
import { SteamPlayer } from "@/types/steam";

export async function getPlayerById(id: string): Promise<SteamPlayer | null> {
 try{
  const user =  await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${id}`)

  const userData = await user.json()
  return userData.response.players[0]
 } catch (error: unknown) {
    console.error(error);
    return null;
 }
}