import { SteamGameData } from '@/types/steam';
import { Card, CardContent } from '@/components/ui/card';

interface GameDescriptionProps {
  game: SteamGameData;
}

export function GameDescription({ game }: GameDescriptionProps) {
  if (!game.short_description) return null;

  return (
    <Card className=" border-white/5 backdrop-blur-sm">
      <CardContent>
        <div className="flex flex-col gap-4">
          <p
            className="text-white/80 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: game.detailed_description }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
