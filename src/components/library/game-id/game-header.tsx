import { SteamGameData } from '@/types/steam';
import { BackgroundHeader } from '@/components/shared/background-header';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';

interface GameDetailsViewProps {
  game: SteamGameData;
}

export default function GameDetailsView({ game }: GameDetailsViewProps) {
  const visibleCategories = game.categories.slice(0, 4);
  const remainingCategories = game.categories.slice(4);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 pb-20">
      <header className="relative min-h-[450px] w-full flex flex-col justify-end overflow-hidden">
        <BackgroundHeader heroUrl={game.imgHero} alt={game.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/40 to-transparent" />

        <div className="relative z-50 px-6 md:px-12 py-12 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-500 text-black font-bold uppercase tracking-widest text-[10px]">
                Lançamento
              </Badge>
              <span className="text-white/60 text-sm font-bold">
                {game.release_date.date}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">
              {game.name}
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
                          <Badge key={c.id} className="text-[10px] bg-white/5">
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
