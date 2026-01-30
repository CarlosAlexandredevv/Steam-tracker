import type { Metadata } from 'next';
import { getAllGames } from '@/app/actions/player/get-all-games';
import { getRecentlyPlayedGames } from '@/app/actions/player/get-recents-played';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { OverviewHeader } from '@/components/overview/header/overview-header';
import { GamesSection } from '@/components/overview/games-section/games-section';
import { NotFoundPlayer } from '@/components/shared/not-found-player';
import { SteamIdRouteParams } from '@/types/route-params';
import { buildTitle } from '@/lib/seo';

interface OverviewProps {
  params: SteamIdRouteParams;
}

export async function generateMetadata({
  params,
}: {
  params: SteamIdRouteParams;
}): Promise<Metadata> {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);
  if (!player)
    return {
      title: buildTitle('Perfil não encontrado'),
      robots: { index: false },
    };
  return {
    title: buildTitle(`Overview - ${player.personaname}`),
    description: `Overview do perfil Steam de ${player.personaname}. Biblioteca, horas jogadas e jogos em destaque.`,
  };
}

export default async function Overview({ params }: OverviewProps) {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);

  if (!player) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 md:px-6">
        <NotFoundPlayer />
      </main>
    );
  }

  const games = await getAllGames(player.steamid);
  const recentGames = await getRecentlyPlayedGames(player.steamid);

  return (
    <main className="flex w-full flex-col bg-background text-foreground gap-6 md:gap-8 overflow-x-hidden max-w-full">
      <OverviewHeader player={player} games={games ?? []} />
      <GamesSection recentGames={recentGames ?? []} player={player} />
    </main>
  );
}
