'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { href: '#features', label: 'Funcionalidades' },
  { href: '#preview', label: 'Preview' },
  { href: '#faq', label: 'Sobre' },
] as const;

export function LandingMobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground hover:bg-white/5"
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(85vw,20rem)] flex flex-col gap-0 border-white/10 bg-background/95 backdrop-blur"
      >
        <SheetHeader className="border-b border-white/10 pb-2 text-left">
          <SheetTitle className="text-lg font-bold italic tracking-tight text-foreground">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 pt-2">
          {NAV_LINKS.map((link) => (
            <SheetClose key={link.href} asChild>
              <Link
                href={link.href}
                className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
