import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { LandingMobileMenu } from './landing-mobile-menu';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between max-w-7xl gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" priority />
          <span className="text-xl font-bold italic tracking-tight text-foreground">
            Steam<span className="text-primary">Tracker</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a
            href="#features"
            className="hover:text-foreground transition-colors duration-300"
          >
            Funcionalidades
          </a>
          <a
            href="#preview"
            className="hover:text-foreground transition-colors duration-300"
          >
            Preview
          </a>
          <a
            href="#faq"
            className="hover:text-foreground transition-colors duration-300"
          >
            Sobre
          </a>
        </nav>

        <div className="md:hidden">
          <LandingMobileMenu />
        </div>
      </div>
    </header>
  );
}
