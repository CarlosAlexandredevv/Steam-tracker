import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SteamOwnedGame } from '@/types/steam';
import { SteamPlayer } from '@/types/steam';
import { GameCard } from '@/components/shared/game-card';

interface CarrouselGamesProps {
  games: SteamOwnedGame[];
  player: SteamPlayer | null;
}

export function CarrouselGames({ games, player }: CarrouselGamesProps) {
  return (
    <Carousel className="w-full max-w-full overflow-hidden">
      <CarouselContent className="-ml-2 md:-ml-4">
        {games.map((game) => (
          <CarouselItem
            key={game.appid}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-[14.28%] pl-2 md:pl-4"
          >
            {player?.steamid && (
              <GameCard
                game={game}
                steamId={player.steamid}
                showFallback={false}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
