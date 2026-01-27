import Image from 'next/image';

interface BackgroundHeaderProps {
  heroUrl?: string;
  alt?: string;
}

export function BackgroundHeader({
  heroUrl,
  alt = 'Game banner',
}: BackgroundHeaderProps) {
  const defaultHeroUrl =
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=90';

  const finalHeroUrl = heroUrl ?? defaultHeroUrl;

  if (!finalHeroUrl) return null;

  return (
    <>
      <Image
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
