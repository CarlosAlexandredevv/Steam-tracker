import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" priority />
            <span className="text-xl font-bold italic tracking-tight text-foreground">
              Steam<span className="text-primary">Tracker</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -z-10" />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 max-w-2xl">
          {/* Número 404 estilizado */}
          <div className="relative inline-block mb-6">
            <span
              className="text-[clamp(6rem,20vw,12rem)] font-black italic tracking-tighter leading-none text-foreground/90 select-none"
              aria-hidden
            >
              404
            </span>
            <span className="absolute inset-0 text-[clamp(6rem,20vw,12rem)] font-black italic tracking-tighter leading-none text-primary/40 blur-xl select-none pointer-events-none">
              404
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Essa URL não existe no SteamTracker. Que tal voltar e buscar um
            perfil Steam?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/">Voltar ao início</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              <Link href="/#features">Ver funcionalidades</Link>
            </Button>
          </div>

          {/* Detalhe decorativo — barras estilo loading Steam */}
          <div className="mt-16 flex justify-center gap-1.5" aria-hidden>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-12 rounded-full bg-primary/30 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
