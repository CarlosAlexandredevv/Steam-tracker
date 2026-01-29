import { getAllGames } from '@/app/actions/player/get-all-games';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { OverviewHeader } from '@/components/overview/header/overview-header';
import { GamesSection } from '@/components/overview/games-section/games-section';
import { NotFoundPlayer } from '@/components/shared/not-found-player';
import { SteamIdRouteParams } from '@/types/route-params';

interface OverviewProps {
  params: SteamIdRouteParams;
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Overview({
  params,
  searchParams,
}: OverviewProps) {
  const { steamId } = await params;
  const { q } = await searchParams;
  const player = await getPlayerById(steamId);

  if (!player) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 md:px-6">
        <NotFoundPlayer />
      </main>
    );
  }

  const games = await getAllGames(player.steamid);

  const gamesFiltered = games?.filter((game) =>
    game.name.toLowerCase().includes(q?.toLowerCase() ?? ''),
  );

  return (
    <main className="flex w-full flex-col bg-background text-foreground gap-6 md:gap-8 overflow-x-hidden max-w-full">
      <OverviewHeader player={player} games={games ?? []} />
      <GamesSection
        games={gamesFiltered ?? []}
        player={player}
        searchQuery={q}
      />
    </main>
  );
}
