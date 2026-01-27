import { getAllGames } from '@/app/actions/user/get-all-games';
import { getPlayerById } from '@/app/actions/user/get-player-by-id';
import { SteamIdRouteParams } from '@/types/route-params';
import { DashboardHeader } from '@/components/dashboard/header/dashboard-header';
import { CarrouselSection } from '@/components/dashboard/carrousel-section/carrousel-section';

interface DashboardProps {
  params: SteamIdRouteParams;
}

export default async function Dashboard({ params }: DashboardProps) {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);
  const games = await getAllGames(player?.steamid ?? '');

  return (
    <main className="flex w-full flex-col gap-8 items-center">
      <DashboardHeader player={player ?? null} games={games ?? []} />
      <div className="w-full px-4 space-y-4">
        <h2 className="text-4xl font-bold">Seus Jogos</h2>
        <CarrouselSection games={games ?? []} />
      </div>
    </main>
  );
}
