import { SteamGameData } from '@/types/steam';
import Image from 'next/image';

interface GalleryCardsProps {
  game: SteamGameData;
}

export function GalleryCards({ game }: GalleryCardsProps) {
  const images = game.screenshots.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
      {images.map((ss) => (
        <div
          key={ss.id}
          className={`group relative aspect-video overflow-hidden rounded-3xl border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-300 hover:border-primary self-end`}
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Image
            src={ss.path_full}
            alt={`${game.name} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}
