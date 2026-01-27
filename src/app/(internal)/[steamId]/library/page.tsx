import { SteamIdRouteParams } from '@/types/route-params';
import { getPlayerById } from '@/app/actions/user/get-player-by-id';
import { getAllGames } from '@/app/actions/user/get-all-games';
import { NotFoundPlayer } from '@/components/overview/not-founds/not-found-player';

interface LibraryProps {
  params: SteamIdRouteParams;
}

export default async function Library({ params }: LibraryProps) {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);

  if (!player) {
    return (
      <main className="flex items-center justify-center h-full px-4">
        <NotFoundPlayer />
      </main>
    );
  }

  const games = await getAllGames(player?.steamid);

  return (
    <main className="flex w-full flex-col bg-background text-foreground gap-4"></main>
  );
}
