import { getAllGames } from '@/app/actions/user/get-all-games';
import { getPlayerById } from '@/app/actions/user/get-player-by-id';
import { SteamIdRouteParams } from '@/types/route-params';
import { DashboardHeader } from '@/components/dashboard/header/dashboard-header';

interface DashboardProps {
  params: SteamIdRouteParams;
}

export default async function Dashboard({ params }: DashboardProps) {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);
  const games = await getAllGames(player?.steamid ?? '');

  return (
    <main>
      <DashboardHeader player={player ?? null} games={games ?? []} />
    </main>
  );
}
