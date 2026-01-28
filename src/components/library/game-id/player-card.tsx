'use client';

import { SteamGameData } from '@/types/steam';
import { Monitor, ShoppingCart, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function PlayerCard({ game }: { game: SteamGameData }) {
  const mainPackage = game?.package_groups[0]?.subs[0];
  const price = mainPackage
    ? (mainPackage.price_in_cents_with_discount / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : 'N/A';

  return (
    <Card className="border-none rounded-[2.5rem] p-6 shadow-2xl w-full h-full bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0 flex flex-col h-full justify-between gap-4">
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={game?.header_image ?? ''}
              alt="Logo do Jogo"
              className="object-cover"
              fill
              priority
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-3xl font-black text-white italic tracking-tighter">
              {game?.is_free ? 'GRÁTIS' : price}
            </span>
            <div className="text-white/20">
              {game?.platforms.windows && <Monitor size={20} />}
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-black font-black py-6 rounded-2xl text-lg uppercase tracking-widest flex items-center justify-center gap-2 border-none cursor-pointer"
            onClick={() =>
              window.open(`steam://run/${game?.steam_appid}`, '_blank')
            }
          >
            <ShoppingCart size={22} className="fill-current" />
            Jogar Agora
          </Button>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
              <span className="text-white/30 tracking-widest">Estúdio</span>
              <span className="text-white/90 truncate ml-4">
                {game?.developers[0]}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
              <span className="text-white/30 tracking-widest">Gênero</span>
              <span className="text-white/90">
                {game?.genres[0].description}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-background/40 rounded-2xl p-4 flex items-center gap-3 border border-white/5">
          <Trophy className="text-[#d97706] h-4 w-4 shrink-0" />
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-tight">
            Inclui {game?.achievements?.total || 0} conquistas Steam
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
