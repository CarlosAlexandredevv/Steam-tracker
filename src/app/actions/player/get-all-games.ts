'use server';

import { env } from '@/env';
import { SteamOwnedGame } from '@/types/steam';
import { getImageUrlWithFallback, safeJsonParse } from '@/lib/utils';
import { withActionLog, logActionFailure } from '@/lib/action-logger';

export interface SteamOwnedGamesApiResponse {
  response: {
    game_count: number;
    games: SteamOwnedGame[];
  };
}

async function fetchAllGames(
  steamId: string,
): Promise<SteamOwnedGame[] | null> {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games=1`,
      { cache: 'no-store' },
    );
    const data = await safeJsonParse<SteamOwnedGamesApiResponse>(response);

    if (!data?.response?.games) {
      return null;
    }

    const gamesWithVerifiedImages = await Promise.all(
      data.response.games.map(async (game) => {
        const heroUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/library_hero.jpg`;
        const bannerUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
        const horizontalUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/capsule_616x353.jpg`;
        const verticalUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`;

        const [hero, banner, horizontal, vertical] = await Promise.all([
          getImageUrlWithFallback(heroUrl),
          getImageUrlWithFallback(bannerUrl),
          getImageUrlWithFallback(horizontalUrl),
          getImageUrlWithFallback(verticalUrl),
        ]);

        return {
          ...game,
          hero,
          banner,
          horizontal,
          vertical,
        };
      }) ?? [],
    );

    const removeImagesContainsHtml = gamesWithVerifiedImages.map((game) => ({
      ...game,
      hero: game.hero?.replace(/<[^>]*>?/g, ''),
      banner: game.banner?.replace(/<[^>]*>?/g, ''),
      horizontal: game.horizontal?.replace(/<[^>]*>?/g, ''),
      vertical: game.vertical?.replace(/<[^>]*>?/g, ''),
    }));

    return removeImagesContainsHtml;
  } catch (error: unknown) {
    logActionFailure('getAllGames', { steamId }, error);
    return null;
  }
}

export async function getAllGames(
  steamId: string,
): Promise<SteamOwnedGame[] | null> {
  return withActionLog('getAllGames', { steamId }, () =>
    fetchAllGames(steamId),
  );
}
