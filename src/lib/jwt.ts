import { SignJWT } from "jose";
import { env } from "@/env";


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
