import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { env } from "@/env";

export async function GET(request: NextRequest) {
  const baseUrl = env.NEXT_PUBLIC_API_URL;
  const returnTo = `${baseUrl}/api/auth/steam/callback`;
  
  const nonce = randomBytes(16).toString("hex");
  
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
