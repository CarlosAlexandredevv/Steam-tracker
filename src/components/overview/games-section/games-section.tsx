import { Gamepad2 } from 'lucide-react';

import { CarrouselGames } from '@/components/overview/games-section/carrousel-games';
import { NotFoundGames } from '@/components/shared/not-found-games';
import { SteamOwnedGame, SteamPlayer } from '@/types/steam';
import { Badge } from '../../ui/badge';

interface GamesSectionProps {
  games: SteamOwnedGame[];
  player: SteamPlayer | null;
  searchQuery?: string | null;
}

export function GamesSection({
  games,
  player,
  searchQuery,
}: GamesSectionProps) {
  const hasGames = games && games.length > 0;
  const isFiltering = searchQuery && searchQuery.trim();

  return (
    <section className="w-full overflow-x-hidden py-6 md:py-8">
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6 border-b border-white/10 pb-5 md:pb-6">
          <div className="space-y-1 min-w-0">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Gamepad2 className="w-8 h-8 text-primary shrink-0" /> Biblioteca
            </h2>
            <p className="text-muted-foreground text-sm">
              {isFiltering ? (
                <>
                  {games?.length ?? 0}{' '}
                  {games?.length === 1
                    ? 'jogo encontrado'
                    : 'jogos encontrados'}{' '}
                  para a pesquisa{' '}
                  <span className="text-white font-medium italic">
                    &quot;{searchQuery}&quot;
                  </span>
                </>
              ) : (
                <>Seus jogos mais recentes e destaques da coleção.</>
              )}
            </p>
          </div>

          <Badge variant="outline" className="px-3 py-2 shrink-0">
            {games?.length ?? 0}{' '}
            {games?.length === 1 ? 'Jogo encontrado' : 'Jogos encontrados'}
          </Badge>
        </div>
      </div>

      <div className="w-full mt-5 md:mt-6">
        {hasGames ? (
          <div className="max-w-7xl mx-auto">
            <CarrouselGames games={games} player={player ?? null} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12 md:py-16">
              <NotFoundGames />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
