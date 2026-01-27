import { cn } from '@/lib/utils';
import { PlayerHeader } from '@/components/overview/header/player-header';
import { SteamPlayer } from '@/types/steam';
import { SteamOwnedGame } from '@/types/steam';
import { BackgroundHeader } from '@/components/shared/background-header';

interface OverviewHeaderProps {
  player: SteamPlayer | null;
  games: SteamOwnedGame[];
}

export function OverviewHeader({ player, games }: OverviewHeaderProps) {
  const gameBiggerplaytime = games
    ?.slice()
    .sort((a, b) => b.playtime_forever - a.playtime_forever)[0];

  return (
    <header
      className={cn('relative min-h-96 w-full flex flex-col overflow-hidden')}
    >
      <BackgroundHeader
        heroUrl={gameBiggerplaytime?.hero}
        alt={gameBiggerplaytime?.name ?? 'Game banner'}
      />

      <PlayerHeader player={player as SteamPlayer} games={games} />
    </header>
  );
}
