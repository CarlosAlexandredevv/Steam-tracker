import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET() {
  const baseUrl = env.NEXT_PUBLIC_APP_URL;
  const returnTo = `${baseUrl}/api/auth/steam/callback`;
    
  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": returnTo,
    "openid.realm": baseUrl,
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
  });

  const steamLoginUrl = `https://steamcommunity.com/openid/login?${params.toString()}`;

  return NextResponse.redirect(new URL(steamLoginUrl));
}
