import { SearchPlayer } from './search-player';
import { NavLinks } from './nav-links';
import { SteamIdRouteParams } from '@/types/route-params';
import { CurrentPlayer } from './current-player';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';

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
        <div className="container flex h-16 items-center justify-end gap-4 px-4 md:px-6">
          <div className="w-full lg:w-96 max-w-full">
            <SearchPlayer />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <NavLinks steamId={steamId} />
        </div>

        <div className="flex items-center flex-1 justify-end gap-6">
          <div className="hidden sm:block w-full max-w-[300px]">
            <SearchPlayer />
          </div>

          {player && <CurrentPlayer player={player} />}
        </div>
      </div>
    </header>
  );
}
