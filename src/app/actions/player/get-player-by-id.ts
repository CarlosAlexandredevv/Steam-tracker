'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import { SteamPlayer } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';

const FETCH_TIMEOUT_MS = 15_000;

function fetchWithTimeout(
  url: string,
  timeoutMs = FETCH_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, {
    cache: 'no-store',
    signal: controller.signal,
  }).finally(() => clearTimeout(timeoutId));
}

function isRetriableNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    if (error.name === 'AbortError' || error.name === 'TypeError') {
      return true;
    }
    const cause = (error as { cause?: { code?: string } }).cause;
    const code = (error as { code?: string }).code ?? cause?.code;
    return (
      code === 'ECONNRESET' ||
      code === 'ETIMEDOUT' ||
      code === 'ECONNREFUSED' ||
      code === 'ENOTFOUND' ||
      code === 'UND_ERR_CONNECT_TIMEOUT'
    );
  }
  return false;
}

async function fetchPlayerById(
  id: string,
  retry = true,
): Promise<SteamPlayer | null> {
  try {
    const [directUserRes, vanityRes] = await Promise.all([
      fetchWithTimeout(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${id}`,
      ),
      fetchWithTimeout(
        `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${env.STEAM_API_KEY}&vanityurl=${id}`,
      ),
    ]);

    if (directUserRes.ok) {
      const userData = await safeJsonParse<{
        response: { players?: SteamPlayer[] };
      }>(directUserRes);
      const player = userData?.response?.players?.[0];
      if (player) {
        return player as SteamPlayer;
      }
    }

    if (vanityRes.ok) {
      const vanityData = await safeJsonParse<{
        response: { steamid?: string };
      }>(vanityRes);
      const resolvedId = vanityData?.response?.steamid as string | undefined;

      if (resolvedId) {
        const resolvedUserRes = await fetchWithTimeout(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${resolvedId}`,
        );

        if (resolvedUserRes.ok) {
          const resolvedUserData = await safeJsonParse<{
            response: { players?: SteamPlayer[] };
          }>(resolvedUserRes);
          const player = resolvedUserData?.response?.players?.[0];
          if (player) {
            return player as SteamPlayer;
          }
        }
      }
    }

    return null;
  } catch (error: unknown) {
    if (retry && isRetriableNetworkError(error)) {
      return fetchPlayerById(id, false);
    }
    if (!isRetriableNetworkError(error)) {
      console.error('[getPlayerById]', id, error);
    }
    return null;
  }
}

export async function getPlayerById(id: string): Promise<SteamPlayer | null> {
  return unstable_cache(async () => fetchPlayerById(id), [`player-${id}`], {
    revalidate: 300, // 5 minutos
    tags: [`player-${id}`],
  })();
}
