import { Gamepad2 } from 'lucide-react';

import { CarrouselGames } from '@/components/overview/games-section/carrousel-games';
import { NotFoundGames } from '@/components/shared/not-found-games';
import { SteamPlayer, SteamRecentlyPlayedGame } from '@/types/steam';
import { Badge } from '../../ui/badge';

interface GamesSectionProps {
  recentGames: SteamRecentlyPlayedGame[];
  player: SteamPlayer | null;
}

export function GamesSection({ recentGames, player }: GamesSectionProps) {
  const hasGames = recentGames && recentGames.length > 0;
  const count = recentGames?.length ?? 0;

  return (
    <section className="w-full overflow-x-hidden py-6 md:py-8">
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6 border-b border-white/10 pb-5 md:pb-6">
          <div className="space-y-1 min-w-0">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Gamepad2 className="w-8 h-8 text-primary shrink-0" /> Jogados
              recentemente
            </h2>
            <p className="text-muted-foreground text-sm">
              {count === 0
                ? 'Nenhum jogo jogado nas últimas duas semanas.'
                : count === 1
                  ? '1 jogo jogado recentemente.'
                  : `${count} jogos jogados recentemente.`}
            </p>
          </div>

          <Badge variant="outline" className="px-3 py-2 shrink-0">
            {count === 1
              ? '1 jogado recentemente'
              : `${count} jogados recentemente`}
          </Badge>
        </div>
      </div>

      <div className="w-full mt-5 md:mt-6">
        {hasGames ? (
          <div className="max-w-7xl mx-auto">
            <CarrouselGames games={recentGames} player={player ?? null} />
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
