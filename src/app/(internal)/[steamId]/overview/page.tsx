import { getAllGames } from '@/app/actions/player/get-all-games';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { OverviewHeader } from '@/components/overview/header/overview-header';
import { GamesSection } from '@/components/overview/games-section/games-section';
import { NotFoundPlayer } from '@/components/shared/not-found-player';
import { SteamIdRouteParams } from '@/types/route-params';

interface OverviewProps {
  params: SteamIdRouteParams;
}

export default async function Overview({ params }: OverviewProps) {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);

  if (!player) {
    return (
      <main className="flex items-center justify-center h-full px-4">
        <NotFoundPlayer />
      </main>
    );
  }

  const games = await getAllGames(player.steamid);

  return (
    <main className="flex w-full flex-col bg-background text-foreground gap-4 overflow-x-hidden max-w-full">
      <OverviewHeader player={player} games={games ?? []} />
      <GamesSection games={games ?? []} player={player} />
    </main>
  );
}
