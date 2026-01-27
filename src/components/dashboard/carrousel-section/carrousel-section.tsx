import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SteamOwnedGame } from '@/types/steam';
import Image from 'next/image';
import { SteamPlayer } from '@/types/steam';
import Link from 'next/link';

interface CarrouselSectionProps {
  games: SteamOwnedGame[];
  player: SteamPlayer | null;
}

export function CarrouselSection({ games, player }: CarrouselSectionProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {games.map((game) => (
          <CarouselItem
            key={game.appid}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-[14.28%] pl-4"
          >
            <Link href={`/${player?.steamid}/game/${game.appid}`}>
              <div className="relative group overflow-hidden rounded-xl aspect-[2/3] w-full bg-gray-900 shadow-lg">
                <Image
                  src={game.vertical ?? ''}
                  alt={game.name}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div
                  className="absolute inset-x-0 bottom-0 flex flex-col justify-end
                                bg-gradient-to-t from-black via-black/80 to-transparent
                                pt-12 pb-4 px-4
                                translate-y-full group-hover:translate-y-0
                                transition-transform duration-300 ease-in-out"
                >
                  <span className="text-white text-sm font-bold text-center leading-tight line-clamp-2 drop-shadow-md">
                    {game.name}
                  </span>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
