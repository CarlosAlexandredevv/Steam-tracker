import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SteamOwnedGame } from '@/types/steam';
import Image from 'next/image';
interface CarrouselSectionProps {
  games: SteamOwnedGame[];
}

export function CarrouselSection({ games }: CarrouselSectionProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {games.map((game) => (
          <CarouselItem key={game.appid} className=" sm:basis-1/2 lg:basis-1/7">
            <Image
              src={game.vertical ?? ''}
              alt={game.name}
              width={100}
              quality={100}
              sizes="(max-width: 768px) 50vw, 300px"
              height={100}
              className="w-full h-full object-cover rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
