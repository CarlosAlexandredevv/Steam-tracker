import { getAllGames } from '@/app/actions/user/get-all-games';
import { getPlayerById } from '@/app/actions/user/get-player-by-id';
import { DashboardHeader } from '@/components/dashboard/header/dashboard-header';
import { GamesSection } from '@/components/dashboard/games-section/games-section';
import { NotFoundPlayer } from '@/components/dashboard/not-founds/not-found-player';
import { SteamIdRouteParams } from '@/types/route-params';

interface DashboardProps {
  params: SteamIdRouteParams;
}

export default async function Dashboard({ params }: DashboardProps) {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);

  if (!player) {
    return (
      <main className="flex items-center justify-center h-full">
        <NotFoundPlayer />
      </main>
    );
  }

  const games = await getAllGames(player.steamid);

  return (
    <main className="flex w-full flex-col bg-background text-foreground gap-4">
      <DashboardHeader player={player} games={games ?? []} />
      <GamesSection games={games ?? []} player={player} />
    </main>
  );
}
