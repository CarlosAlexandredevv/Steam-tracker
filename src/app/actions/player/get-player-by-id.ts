'use server';

import { unstable_cache } from 'next/cache';
import { env } from '@/env';
import { SteamPlayer } from '@/types/steam';

async function fetchPlayerById(id: string): Promise<SteamPlayer | null> {
  try {
    const [directUserRes, vanityRes] = await Promise.all([
      fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${id}`,
      ),
      fetch(
        `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${env.STEAM_API_KEY}&vanityurl=${id}`,
      ),
    ]);

    if (directUserRes.ok) {
      const userData = await directUserRes.json();
      const player = userData?.response?.players?.[0];
      if (player) {
        return player as SteamPlayer;
      }
    }

    if (vanityRes.ok) {
      const vanityData = await vanityRes.json();
      const resolvedId = vanityData?.response?.steamid as string | undefined;

      if (resolvedId) {
        const resolvedUserRes = await fetch(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${resolvedId}`,
        );

        if (resolvedUserRes.ok) {
          const resolvedUserData = await resolvedUserRes.json();
          const player = resolvedUserData?.response?.players?.[0];
          if (player) {
            return player as SteamPlayer;
          }
        }
      }
    }

    return null;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function getPlayerById(id: string): Promise<SteamPlayer | null> {
  return unstable_cache(async () => fetchPlayerById(id), [`player-${id}`], {
    revalidate: 300, // 5 minutos
    tags: [`player-${id}`],
  })();
}
