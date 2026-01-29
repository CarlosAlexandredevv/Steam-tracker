'use server';

import { cache } from 'react';
import { env } from '@/env';
import { SteamPlayer } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

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
      logActionFailure('getPlayerById', { id }, error);
    }
    return null;
  }
}

const STEAM_IDS_BATCH_SIZE = 100;

async function fetchPlayersByIds(ids: string[]): Promise<SteamPlayer[]> {
  if (ids.length === 0) return [];
  const unique = [...new Set(ids)].slice(0, STEAM_IDS_BATCH_SIZE);
  try {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${
      env.STEAM_API_KEY
    }&steamids=${unique.join(',')}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return [];
    const data = await safeJsonParse<{
      response: { players?: SteamPlayer[] };
    }>(res);
    return (data?.response?.players ?? []) as SteamPlayer[];
  } catch (error) {
    logActionFailure('getPlayersByIds', { count: unique.length }, error);
    return [];
  }
}

/** Deduplica por request: layout, header, page e metadata compartilham o mesmo fetch. */
const getPlayerByIdCached = cache(
  (id: string): Promise<SteamPlayer | null> => fetchPlayerById(id),
);

export async function getPlayerById(id: string): Promise<SteamPlayer | null> {
  return withActionLog('getPlayerById', { id }, () => getPlayerByIdCached(id));
}

/**
 * Busca vários jogadores em uma única chamada à API (até 100).
 * Use em getAllFriendsPlayer para evitar N chamadas getPlayerById.
 */
export async function getPlayersByIds(ids: string[]): Promise<SteamPlayer[]> {
  if (ids.length === 0) return [];
  return withActionLog('getPlayersByIds', { count: ids.length }, () =>
    fetchPlayersByIds(ids),
  );
}
