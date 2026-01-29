'use client';

import { usePathname } from 'next/navigation';
import { SearchPlayer } from './search-player';
import { NavLinks } from './nav-links';

export function Header() {
  const pathname = usePathname();
  const steamId = pathname?.split('/')[1];

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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6 max-w-7xl mx-auto">
        <NavLinks steamId={steamId} />

        <div className="flex items-center gap-4">
          <div className="w-full lg:w-96 max-w-full">
            <SearchPlayer />
          </div>
        </div>
      </div>
    </header>
  );
}
