import { SteamGameData } from '@/types/steam';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface GameDescriptionProps {
  game: SteamGameData;
}

export function GameDescription({ game }: GameDescriptionProps) {
  if (!game.short_description) return null;

  return (
    <Card className=" border-white/5 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
            <Star className="text-primary w-5 h-5 fill-current" />
            Sobre o Jogo
          </h2>
          <p
            className="text-white/80 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: game.detailed_description }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
