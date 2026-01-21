import { SignJWT, jwtVerify } from "jose";
import { env } from "@/env";
import { cookies } from "next/headers";

export interface DecodedToken {
  userId: string;
  steamId: string;
  iat: number;
  exp: number;
}

export async function generateAccessToken(
  payload: Record<string, unknown>,
  expiresIn: string | number = "1h"
): Promise<string> {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está configurado");
  }

  const secret = new TextEncoder().encode(env.JWT_SECRET);
  
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

  return jwt;
}

export async function generateUserAccessToken(
  userId: string,
  additionalPayload?: Record<string, unknown>,
  expiresIn: string | number = "1h"
): Promise<string> {
  return generateAccessToken(
    {
      userId,
      ...additionalPayload,
    },
    expiresIn
  );
}


export async function decodeToken(): Promise<DecodedToken> {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está configurado");
  }

  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const secret = new TextEncoder().encode(env.JWT_SECRET);
  
  const { payload } = await jwtVerify(token, secret);
  
  const decodedPayload = payload as unknown as Record<string, unknown>;
  
  if (
    typeof decodedPayload.userId === "string" &&
    typeof decodedPayload.steamId === "string" &&
    typeof decodedPayload.iat === "number" &&
    typeof decodedPayload.exp === "number"
  ) {
    return {
      userId: decodedPayload.userId,
      steamId: decodedPayload.steamId,
      iat: decodedPayload.iat,
      exp: decodedPayload.exp,
    };
  }
  
  throw new Error("Token inválido: payload não contém as propriedades esperadas");
}
