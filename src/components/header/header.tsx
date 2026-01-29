'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad, LayoutGrid, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchPlayer } from './search-player';

interface NavItem {
  name: string;
  href: string;
  icon: typeof Gamepad;
}

export function Header() {
  const pathname = usePathname();
  const steamId = pathname.split('/')[1];

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

  const navItems: NavItem[] = [
    {
      name: 'Overview',
      href: `/${steamId}/overview`,
      icon: Gamepad,
    },
    {
      name: 'Biblioteca',
      href: `/${steamId}/library`,
      icon: LayoutGrid,
    },
    {
      name: 'Amigos',
      href: `/${steamId}/friends`,
      icon: Users,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${steamId}/overview` &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative flex items-center gap-2 py-2 text-sm font-medium transition-colors',
                  'hover:text-foreground',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                  'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transition-opacity',
                  isActive
                    ? 'after:opacity-100'
                    : 'after:opacity-0 hover:after:opacity-50',
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-full lg:w-96 max-w-full">
            <SearchPlayer />
          </div>
        </div>
      </div>
    </header>
  );
}
