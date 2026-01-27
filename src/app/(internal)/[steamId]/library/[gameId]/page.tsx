import { getGameById } from '@/app/actions/player/get-game-by-id';
import { GalleryCards } from '@/components/library/game-id/gallery-cards';
import { PlayerCard } from '@/components/library/game-id/player-card';
import GameDetailsView from '@/components/library/game-id/game-header';
import { NotFoundGames } from '@/components/shared/not-found-games';
import { Star } from 'lucide-react';

interface GamePageProps {
  params: Promise<{
    steamId: string;
    gameId: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;
  const game = await getGameById(gameId);

  if (!game)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <NotFoundGames />
      </div>
    );

  return (
    <main className="flex w-full flex-col bg-[#0b0e14] text-foreground min-h-screen">
      <GameDetailsView game={game} />

      <div className="z-50 px-6 md:px-12 py-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-7 flex flex-col gap-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Star className="text-primary w-5 h-5 fill-current" />
              Galeria de Imagens
            </h2>
            <div className="flex-1">
              <GalleryCards game={game} />
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Star className="text-primary w-5 h-5 fill-current" />
              Jogar Agora
            </h2>
            <PlayerCard game={game} />
          </div>
        </div>
      </div>
    </main>
  );
}
