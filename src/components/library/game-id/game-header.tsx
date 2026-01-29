import { SteamGameData } from '@/types/steam';
import { BackgroundHeader } from '@/components/shared/background-header';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExternalLink, Plus } from 'lucide-react';
import Link from 'next/link';

interface GameDetailsViewProps {
  game: SteamGameData;
}

export default function GameDetailsView({ game }: GameDetailsViewProps) {
  const visibleCategories = game.categories.slice(0, 4);
  const remainingCategories = game.categories.slice(4);

  return (
    <div className="h-auto text-slate-200">
      <header className="relative min-h-[450px] w-full flex flex-col justify-end overflow-hidden">
        <BackgroundHeader heroUrl={game.imgHero} alt={game.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/40 to-transparent" />

        <div className="relative z-50 px-6 md:px-12 py-12 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-black font-bold uppercase tracking-widest text-[10px]">
                Lançamento
              </Badge>
              <span className="text-white/60 text-sm font-bold">
                {game.release_date.date}
              </span>
            </div>

            {/* --- CORREÇÃO AQUI --- */}
            {/* 1. Removido 'flex' e 'gap-2'. Agora é bloco padrão. */}
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">
              <span className="mr-2">{game.name}</span>

              {/* 2. Links agora são 'inline-flex' com 'align-middle' para ficarem na linha do texto */}
              {game.website && (
                <Link
                  href={game.website}
                  target="_blank"
                  className="inline-flex align-middle opacity-50 hover:opacity-100 transition-opacity text-white mx-1"
                  title="Ver site oficial do jogo"
                >
                  <ExternalLink className="size-6" />
                </Link>
              )}

              <Link
                href={`https://store.steampowered.com/app/${game.steam_appid}`}
                target="_blank"
                className="inline-flex align-middle opacity-50 hover:opacity-100 transition-opacity text-white mx-1"
                title="Ver na Steam Store"
              >
                <svg
                  className="size-6"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.102 12.129c0-0 0-0 0-0.001 0-1.564 1.268-2.831 2.831-2.831s2.831 1.268 2.831 2.831c0 1.564-1.267 2.831-2.831 2.831-0 0-0 0-0.001 0h0c-0 0-0 0-0.001 0-1.563 0-2.83-1.267-2.83-2.83 0-0 0-0 0-0.001v0zM24.691 12.135c0-2.081-1.687-3.768-3.768-3.768s-3.768 1.687-3.768 3.768c0 2.081 1.687 3.768 3.768 3.768v0c2.080-0.003 3.765-1.688 3.768-3.767v-0zM10.427 23.76l-1.841-0.762c0.524 1.078 1.611 1.808 2.868 1.808 1.317 0 2.448-0.801 2.93-1.943l0.008-0.021c0.155-0.362 0.246-0.784 0.246-1.226 0-1.757-1.424-3.181-3.181-3.181-0.405 0-0.792 0.076-1.148 0.213l0.022-0.007 1.903 0.787c0.852 0.364 1.439 1.196 1.439 2.164 0 1.296-1.051 2.347-2.347 2.347-0.324 0-0.632-0.066-0.913-0.184l0.015 0.006zM15.974 1.004c-7.857 0.001-14.301 6.046-14.938 13.738l-0.004 0.054 8.038 3.322c0.668-0.462 1.495-0.737 2.387-0.737 0.001 0 0.002 0 0.002 0h-0c0.079 0 0.156 0.005 0.235 0.008l3.575-5.176v-0.074c0.003-3.12 2.533-5.648 5.653-5.648 3.122 0 5.653 2.531 5.653 5.653s-2.531 5.653-5.653 5.653h-0.131l-5.094 3.638c0 0.065 0.005 0.131 0.005 0.199 0 0.001 0 0.002 0 0.003 0 2.342-1.899 4.241-4.241 4.241-2.047 0-3.756-1.451-4.153-3.38l-0.005-0.027-5.755-2.383c1.841 6.345 7.601 10.905 14.425 10.905 8.281 0 14.994-6.713 14.994-14.994s-6.713-14.994-14.994-14.994c-0 0-0.001 0-0.001 0h0z" />
                </svg>
              </Link>
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-white/50 text-xs font-bold uppercase tracking-widest mr-2">
                Tags:
              </span>
              {visibleCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="bg-black/40 border-white/10 px-3 py-1.5 text-white text-xs"
                >
                  {category.description}
                </Badge>
              ))}
              {remainingCategories.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className="bg-black/40 border-white/10 px-3 py-1.5 text-white cursor-pointer hover:bg-white/10"
                      >
                        <Plus className="w-3 h-3" />
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-900 border-zinc-800 p-3 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {remainingCategories.map((c) => (
                          <Badge key={c.id} className="text-xs bg-white/5">
                            {c.description}
                          </Badge>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
