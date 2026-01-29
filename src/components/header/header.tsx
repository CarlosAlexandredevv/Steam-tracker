import Link from 'next/link';
import { SearchPlayer } from './search-player';
import { NavLinks } from './nav-links';
import { SteamIdRouteParams } from '@/types/route-params';
import { CurrentPlayer } from './current-player';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { Logo } from '@/components/shared/logo';

interface HeaderProps {
  params: SteamIdRouteParams;
}

export async function Header({ params }: HeaderProps) {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);

  if (!player) {
    return null;
  }

  if (!steamId) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" priority />
            <span className="text-xl font-bold italic tracking-tight text-foreground">
              Steam<span className="text-primary">Track</span>
            </span>
          </Link>
          <SearchPlayer />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo size="md" priority />
            <span className="text-xl font-bold italic tracking-tight text-foreground hidden sm:inline">
              Steam<span className="text-primary">Track</span>
            </span>
          </Link>
          <NavLinks steamId={steamId} />
        </div>

        <div className="flex items-center flex-1 justify-end gap-6">
          <SearchPlayer />

          {player && <CurrentPlayer player={player} />}
        </div>
      </div>
    </header>
  );
}
