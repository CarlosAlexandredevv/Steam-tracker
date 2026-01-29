'use server';

import { cache } from 'react';
import { env } from '@/env';
import { SteamPlayer } from '@/types/steam';
import { safeJsonParse } from '@/lib/utils';
import { fetchSteamApi } from '@/lib/steam-api';

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
      fetchSteamApi(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${id}`,
      ),
      fetchSteamApi(
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
        const resolvedUserRes = await fetchSteamApi(
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
    return null;
  }
}

const STEAM_IDS_BATCH_SIZE = 100;

async function fetchOneBatchOfPlayers(
  steamIds: string[],
): Promise<SteamPlayer[]> {
  if (steamIds.length === 0) return [];
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${
    env.STEAM_API_KEY
  }&steamids=${steamIds.join(',')}`;
  const res = await fetchSteamApi(url);
  if (!res.ok) return [];
  const data = await safeJsonParse<{
    response: { players?: SteamPlayer[] };
  }>(res);
  return (data?.response?.players ?? []) as SteamPlayer[];
}

async function fetchPlayersByIds(ids: string[]): Promise<SteamPlayer[]> {
  if (ids.length === 0) return [];
  const unique = [...new Set(ids)];
  const allPlayers: SteamPlayer[] = [];

  for (let i = 0; i < unique.length; i += STEAM_IDS_BATCH_SIZE) {
    const chunk = unique.slice(i, i + STEAM_IDS_BATCH_SIZE);
    try {
      const players = await fetchOneBatchOfPlayers(chunk);
      allPlayers.push(...players);
    } catch {}
  }

  return allPlayers;
}

const getPlayerByIdCached = cache(
  (id: string): Promise<SteamPlayer | null> => fetchPlayerById(id),
);

export async function getPlayerById(id: string): Promise<SteamPlayer | null> {
  return getPlayerByIdCached(id);
}

export async function getPlayersByIds(ids: string[]): Promise<SteamPlayer[]> {
  if (ids.length === 0) return [];
  return fetchPlayersByIds(ids);
}
