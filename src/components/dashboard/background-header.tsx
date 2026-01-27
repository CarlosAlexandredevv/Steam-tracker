import Image from 'next/image';
import { SteamOwnedGame } from '@/types/steam';

interface BackgroundHeaderProps {
  game?: SteamOwnedGame;
}

export function BackgroundHeader({ game }: BackgroundHeaderProps) {
  const heroUrl =
    game?.hero ??
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=90';

  if (!heroUrl) return null;

  return (
    <Image
      src={heroUrl}
      alt={game?.name ?? 'Game banner'}
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
  );
}
