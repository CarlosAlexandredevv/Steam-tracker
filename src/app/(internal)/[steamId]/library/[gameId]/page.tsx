import { getGameById } from '@/app/actions/player/get-game-by-id';
import { NotFoundGames } from '@/components/shared/not-found-games';
import GameDetailsView from '@/components/library/game-id/game-header';

interface GamePageProps {
  params: Promise<{
    steamId: string;
    gameId: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  const game = await getGameById(gameId);

  if (!game) {
    return (
      <div className="flex items-center justify-center h-full px-4">
        <NotFoundGames />
      </div>
    );
  }

  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen">
      <GameDetailsView game={game} />
      <div className="p-4 md:p-8 gap-8"></div>
    </main>
  );
}
