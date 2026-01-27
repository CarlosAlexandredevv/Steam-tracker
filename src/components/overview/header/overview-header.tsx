import { cn } from '@/lib/utils';
import { PlayerHeader } from '@/components/overview/header/player-header';
import { SteamPlayer } from '@/types/steam';
import { SteamOwnedGame } from '@/types/steam';
import { BackgroundHeader } from './background-header';

interface OverviewHeaderProps {
  player: SteamPlayer | null;
  games: SteamOwnedGame[];
}

export function OverviewHeader({ player, games }: OverviewHeaderProps) {
  const gameBiggerplaytime = games
    ?.slice()
    .sort((a, b) => b.playtime_forever - a.playtime_forever)[0];

  return (
    <header className={cn('relative h-96 w-full overflow-hidden')}>
      <BackgroundHeader game={gameBiggerplaytime} />

      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      <PlayerHeader player={player as SteamPlayer} games={games} />
    </header>
  );
}
