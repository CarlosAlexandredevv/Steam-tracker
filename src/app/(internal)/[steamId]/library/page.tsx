import { SteamIdRouteParams } from '@/types/route-params';
import { getPlayerById } from '@/app/actions/user/get-player-by-id';
import { getAllGames } from '@/app/actions/user/get-all-games';
import { NotFoundPlayer } from '@/components/shared/not-found-player';
import { GameCard } from '@/components/shared/game-card';
import { HeaderLibrary } from '@/components/library/header-library';
import { NotFoundGames } from '@/components/shared/not-found-games';

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
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen p-4 md:p-8 gap-8">
      {games ? (
        <HeaderLibrary totalGames={games?.length ?? 0} />
      ) : (
        <div className="flex h-full items-center justify-center py-10 px-4">
          <NotFoundGames />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {games?.map((game) => (
          <GameCard
            key={game.appid}
            game={game}
            steamId={player.steamid}
            showFallback={true}
          />
        ))}
      </div>
    </main>
  );
}
