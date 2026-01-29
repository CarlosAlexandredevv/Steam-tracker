import { ImageWithFallback } from './image-with-fallback';

interface BackgroundHeaderProps {
  heroUrl?: string;
  alt?: string;
}

const DEFAULT_HERO =
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=90';

export function BackgroundHeader({
  heroUrl,
  alt = 'Game banner',
}: BackgroundHeaderProps) {
  const finalHeroUrl = heroUrl ?? DEFAULT_HERO;

  if (!finalHeroUrl) return null;

  return (
    <>
      <ImageWithFallback
        src={finalHeroUrl}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </>
  );
}
