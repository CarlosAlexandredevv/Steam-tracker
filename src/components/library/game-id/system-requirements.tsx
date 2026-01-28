import { SteamGameData } from '@/types/steam';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function SystemRequirements({ game }: { game: SteamGameData }) {
  const renderReq = (html?: string) => {
    if (!html || html.trim() === '')
      return <p className="text-white/20 italic text-[11px]">Não informado.</p>;
    return (
      <div
        className="text-base text-white/50 leading-relaxed prose-strong:text-white/80 prose-strong:font-bold prose-br:my-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <Card className="border-none rounded-[2.5rem] p-8 shadow-2xl w-full mt-12">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase text-lg tracking-[0.2em]">
              Mínimo
            </h3>
            {renderReq(game.pc_requirements.minimum)}
          </div>

          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <Separator orientation="vertical" className="bg-white/5 h-full" />
          </div>

          <div className="space-y-4">
            <h3 className="text-primary font-black uppercase text-lg tracking-[0.2em]">
              Recomendado
            </h3>
            {renderReq(game.pc_requirements.recommended)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
