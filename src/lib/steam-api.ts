const FETCH_TIMEOUT_MS = 15_000;

export function fetchSteamApi(
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

export const CACHE_REVALIDATE = {
  player: 120, // 2 min
  games: 300, // 5 min
  recentlyPlayed: 300, // 5 min
  gameDetails: 600, // 10 min
  friends: 60, // 1 min
  achievements: 300, // 5 min
  statistics: 120, // 2 min
} as const;
