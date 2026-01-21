import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID, createHmac } from "crypto";
import { cookies } from "next/headers";
import { generateUserAccessToken } from "@/lib/jwt";

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

interface SteamGetPlayerSummariesResponse {
  response: {
    players: SteamPlayer[];
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const claimedId = searchParams.get("openid.claimed_id");
  const urlBase= `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=`
  
  if(!claimedId) {
    throw new Error("Claimed ID is required");
  }

  const steamIdMatch = claimedId.match(/\/id\/(\d+)$/);
  
  if (!steamIdMatch) {
   throw new Error("Steam ID is required");
  }

  const steamId = steamIdMatch[1];

  const user = await prisma.user.findFirst({
    where: {
      steamId: steamId,
    },
  });

  const response = await fetch(`${urlBase}${steamId}`);
  const data: SteamGetPlayerSummariesResponse = await response.json();
  const player = data.response.players[0];

  if (!user) {
      await prisma.user.create({
      data: {
        id: randomUUID(),
        steamId: steamId,
        name: player.personaname,
        image: player.avatarfull,
      },
    });
  }

  const tokenUser = await prisma.user.findFirst({
    where: {
      steamId: steamId,
    },
  });

  if (!tokenUser) {
    throw new Error("User not found");
  }

  const token = await generateUserAccessToken(tokenUser.id!);
  
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });

  return NextResponse.redirect(new URL("/dashboard", env.NEXT_PUBLIC_API_URL));
}
