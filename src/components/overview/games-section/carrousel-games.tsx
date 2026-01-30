import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SteamOwnedGame, SteamPlayer, SteamRecentlyPlayedGame } from '@/types/steam';
import { GameCard } from '@/components/shared/game-card';

interface CarrouselGamesProps {
  games: (SteamOwnedGame | SteamRecentlyPlayedGame)[];
  player: SteamPlayer | null;
}

export function CarrouselGames({ games, player }: CarrouselGamesProps) {
  return (
    <div className="px-4 md:px-6 w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {games.map((game) => (
            <CarouselItem
              key={game.appid}
              className="m-2 md:m-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-[14.28%] pl-3 md:pl-4"
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
    </div>
  );
}
