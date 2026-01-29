import Link from 'next/link';
import { MonitorPlay, Trophy, Users, Gamepad2, Clock } from 'lucide-react';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { getAllGames } from '@/app/actions/player/get-all-games';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CarrouselGames } from '@/components/overview/games-section/carrousel-games';

const PREVIEW_VANITY = '76561199441912879';

const HIGHLIGHTS = [
  {
    title: 'Raridade de Conquistas',
    description: 'Veja quais conquistas menos de 1% dos jogadores possuem.',
    icon: Trophy,
  },
  {
    title: 'Status de Amigos',
    description:
      'Saiba quem está Online, Ausente ou Jogando Agora com filtros visuais.',
    icon: Users,
  },
] as const;

function PreviewCardSkeleton() {
  return (
    <div className="w-full max-w-sm bg-card border border-white/10 rounded-2xl p-4 md:p-5 shadow-xl">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="size-14 md:size-16 rounded-xl bg-secondary shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 w-28 bg-white/10 rounded" />
          <div className="h-4 w-20 bg-white/5 rounded" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 w-14 rounded-lg bg-white/5 flex-1" />
        ))}
      </div>
    </div>
  );
}

export async function LandingPreview() {
  const player = await getPlayerById(PREVIEW_VANITY);
  const games = player ? await getAllGames(player.steamid) : null;
  const gamesCount = games?.length ?? 0;
  const totalHours =
    games?.reduce((acc, g) => acc + (g.playtime_forever ?? 0), 0) ?? 0;
  const totalHoursFormatted =
    totalHours > 0
      ? `${Math.round(totalHours / 60).toLocaleString('pt-BR')}h`
      : null;

  return (
    <section id="preview" className="py-16 md:py-24 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-wider text-sm">
              <MonitorPlay size={20} />
              <span>Interface Imersiva</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-4 md:mb-6 text-foreground uppercase">
              Detalhes que fazem a diferença
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Cada página foi desenhada para destacar o que importa: a arte dos
              jogos e suas estatísticas. Do Hero Banner dinâmico às barras de
              progresso de conquistas com raridade global.
            </p>

            <div className="space-y-5 md:space-y-6 pt-2">
              {HIGHLIGHTS.map((item) => (
                <div key={item.title} className="flex gap-4 md:gap-5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 w-full flex justify-center md:justify-end relative">
            {!player ? (
              <div className="w-full max-w-sm">
                <PreviewCardSkeleton />
              </div>
            ) : (
              <Link
                href={`/${PREVIEW_VANITY}/overview`}
                className="block w-full max-w-sm group"
              >
                <div className="relative bg-card border border-white/10 rounded-2xl p-4 md:p-5 shadow-xl transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/30 group-hover:shadow-2xl">
                  <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 md:gap-4">
                    <Avatar className="!size-14 md:!size-16 !rounded-xl border-2 border-white/10 shrink-0">
                      <AvatarImage
                        src={player.avatarmedium ?? player.avatarfull}
                        alt={player.personaname}
                        className="rounded-xl"
                      />
                      <AvatarFallback className="rounded-xl bg-secondary text-sm font-bold text-foreground">
                        {player.personaname.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground truncate">
                        {player.personaname}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Gamepad2 className="size-3.5" />
                          {gamesCount} {gamesCount === 1 ? 'jogo' : 'jogos'}
                        </span>
                        {totalHoursFormatted && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" />
                            {totalHoursFormatted}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Ver perfil completo →
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {player && (games ?? []).length > 0 && (
          <div className="mt-12 md:mt-16 w-full">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Gamepad2 className="size-6 md:size-8 text-primary shrink-0" />
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Jogos
              </h3>
            </div>
            <CarrouselGames games={games ?? []} player={player} />
          </div>
        )}
      </div>
    </section>
  );
}
