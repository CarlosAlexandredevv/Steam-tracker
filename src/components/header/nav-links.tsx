'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad, LayoutGrid, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: typeof Gamepad;
}

interface NavLinksProps {
  steamId: string;
}

export function NavLinks({ steamId }: NavLinksProps) {
  const pathname = usePathname();

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
              isActive ? 'text-foreground' : 'text-muted-foreground',
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
  );
}
