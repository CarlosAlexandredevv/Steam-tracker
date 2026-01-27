import { SteamIdRouteParams } from '@/types/route-params';
import { getPlayerById } from '@/app/actions/user/get-player-by-id';
import { getAllGames } from '@/app/actions/user/get-all-games';
import { NotFoundPlayer } from '@/components/overview/not-founds/not-found-player';
import { LayoutGrid, Search } from 'lucide-react';
import { GameCard } from '@/components/shared/game-card';

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-primary" />
            Biblioteca de Jogos
          </h1>
          <p className="text-muted-foreground text-sm">
            Explorar todos os {games?.length ?? 0} jogos da sua coleção.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar jogo..."
            className="w-full h-10 rounded-md border border-input bg-secondary/50 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

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
