import { SteamIdRouteParams } from '@/types/route-params';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { getAllGames } from '@/app/actions/player/get-all-games';
import { NotFoundPlayer } from '@/components/shared/not-found-player';
import { GameCard } from '@/components/shared/game-card';
import { HeaderLibrary } from '@/components/library/header-library';
import { NotFoundGames } from '@/components/shared/not-found-games';

interface LibraryProps {
  params: SteamIdRouteParams;
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Library({ params, searchParams }: LibraryProps) {
  const { steamId } = await params;
  const { q } = await searchParams;
  const player = await getPlayerById(steamId);

  if (!player) {
    return (
      <main className="flex items-center justify-center h-full">
        <div className="px-4 md:px-6 w-full max-w-7xl mx-auto">
          <NotFoundPlayer />
        </div>
      </main>
    );
  }

  const games = await getAllGames(player?.steamid);

  const gamesFiltered = games?.filter((game) =>
    game.name.toLowerCase().includes(q?.toLowerCase() ?? ''),
  );

  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen gap-8">
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto space-y-8 pt-4 md:pt-8">
        {games ? (
          <HeaderLibrary games={gamesFiltered ?? []} />
        ) : (
          <div className="flex h-full items-center justify-center py-10">
            <NotFoundGames />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {gamesFiltered?.map((game) => (
            <GameCard
              key={game.appid}
              game={game}
              steamId={player.steamid}
              showFallback={true}
            />
          ))}
        </div>
        {gamesFiltered?.length === 0 && (
          <div className="flex items-center justify-center py-10">
            <NotFoundGames />
          </div>
        )}
      </div>
    </main>
  );
}
