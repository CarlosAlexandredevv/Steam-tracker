import Image from 'next/image';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { SteamOwnedGame } from '@/types/steam';

interface GameCardProps {
  game: SteamOwnedGame;
  steamId: string;
  showFallback?: boolean;
  className?: string;
}

export function GameCard({
  game,
  steamId,
  showFallback = true,
  className = '',
}: GameCardProps) {
  const hasImage = game.vertical && game.vertical !== '';

  return (
    <Link
      href={`/${steamId}/game/${game.appid}`}
      className={`group relative flex flex-col gap-2 ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] w-full bg-gray-900 shadow-sm border border-white/5 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/50 group-hover:shadow-lg group-hover:-translate-y-1">
        {hasImage ? (
          <>
            <Image
              src={game.vertical!}
              alt={game.name}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white text-xs font-bold leading-tight line-clamp-2 drop-shadow-md">
                {game.name}
              </span>
            </div>
          </>
        ) : showFallback ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-secondary/20 group-hover:bg-secondary/30">
            <Gamepad2 className="w-8 h-8 text-muted-foreground mb-2 opacity-50" />
            <span className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-semibold line-clamp-2">
              {game.name}
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
