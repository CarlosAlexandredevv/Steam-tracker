import type { Metadata } from 'next';
import { SteamIdRouteParams } from '@/types/route-params';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { getAllGames } from '@/app/actions/player/get-all-games';
import { NotFoundPlayer } from '@/components/shared/not-found-player';
import { GameCard } from '@/components/shared/game-card';
import { HeaderLibrary } from '@/components/library/header-library';
import { NotFoundGames } from '@/components/shared/not-found-games';
import { buildTitle } from '@/lib/seo';

interface LibraryProps {
  params: SteamIdRouteParams;
  searchParams: Promise<{
    q?: string;
  }>;
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
    title: buildTitle(`Biblioteca - ${player.personaname}`),
    description: `Biblioteca de jogos Steam de ${player.personaname}. Busque e filtre jogos da coleção.`,
  };
}

export default async function Library({ params, searchParams }: LibraryProps) {
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

  const games = await getAllGames(player?.steamid);

  const gamesFiltered = games?.filter((game) =>
    game.name.toLowerCase().includes(q?.toLowerCase() ?? ''),
  );

  if (!games) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 md:px-6">
        <NotFoundGames />
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen">
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto py-6 md:py-10 space-y-6 md:space-y-10">
        <HeaderLibrary games={gamesFiltered ?? []} />

        {gamesFiltered && gamesFiltered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {gamesFiltered.map((game) => (
              <GameCard
                key={game.appid}
                game={game}
                steamId={player.steamid}
                showFallback={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[calc(100vh-4rem-200px)] items-center justify-center py-12 md:py-16">
            <NotFoundGames />
          </div>
        )}
      </div>
    </main>
  );
}
