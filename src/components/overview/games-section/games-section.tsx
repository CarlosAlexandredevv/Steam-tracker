import { Gamepad2 } from 'lucide-react';

import { CarrouselGames } from '@/components/overview/games-section/carrousel-games';
import { NotFoundGames } from '@/components/shared/not-found-games';
import { SteamOwnedGame, SteamPlayer } from '@/types/steam';
import { Badge } from '../../ui/badge';

interface GamesSectionProps {
  games: SteamOwnedGame[];
  player: SteamPlayer | null;
}

export function GamesSection({ games, player }: GamesSectionProps) {
  const hasGames = games && games.length > 0;

  return (
    <section className="w-full px-4 overflow-x-hidden max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1 min-w-0">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-primary shrink-0" /> Biblioteca
          </h2>
          <p className="text-muted-foreground text-sm">
            Seus jogos mais recentes e destaques da coleção.
          </p>
        </div>

        <Badge variant="outline" className="px-3 py-2 shrink-0">
          {games?.length ?? 0}{' '}
          {games?.length === 1 ? 'Jogo encontrado' : 'Jogos encontrados'}
        </Badge>
      </div>

      <div className="w-full mt-4 overflow-x-hidden max-w-full">
        {hasGames ? (
          <CarrouselGames games={games} player={player ?? null} />
        ) : (
          <div className="flex items-center justify-center py-10 px-4">
            <NotFoundGames />
          </div>
        )}
      </div>
    </section>
  );
}
