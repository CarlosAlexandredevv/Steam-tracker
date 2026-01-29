/**
 * Helper centralizado para chamadas à API Steam.
 * - Timeout para evitar requests travados
 * - Reuso em todas as server actions
 */

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

/** TTLs em segundos para unstable_cache — reduz hits na API Steam e respeita rate limits */
export const CACHE_REVALIDATE = {
  player: 120, // 2 min — perfil muda pouco
  games: 300, // 5 min — biblioteca muda pouco
  gameDetails: 600, // 10 min — dados da loja
  friends: 60, // 1 min — lista de amigos
  achievements: 300,
  statistics: 120,
} as const;
