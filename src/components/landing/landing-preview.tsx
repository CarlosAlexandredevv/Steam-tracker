import { MonitorPlay, Trophy, Users } from 'lucide-react';

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

export function LandingPreview() {
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

          <div className="md:w-1/2 relative perspective-1000">
            <div className="relative z-10 bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform md:rotate-y-[-8deg] transition-transform duration-500 hover:rotate-0">
              <div className="h-40 bg-linear-to-r from-primary/20 to-card relative">
                <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-background to-transparent opacity-90" />
                <div className="absolute -bottom-10 left-6 flex items-end gap-4">
                  <div className="w-24 h-24 bg-secondary rounded-xl border-4 border-background shadow-lg" />
                  <div className="mb-12">
                    <div className="h-6 w-32 bg-white/10 rounded mb-2" />
                    <div className="flex gap-2">
                      <div className="h-4 w-16 bg-primary/20 rounded" />
                      <div className="h-4 w-16 bg-primary/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6 pt-14 md:pt-16 bg-background min-h-[300px]">
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="h-32 bg-card border border-white/5 rounded-xl" />
                  <div className="h-32 bg-card border border-white/5 rounded-xl" />
                  <div className="h-32 bg-card border border-white/5 rounded-xl" />
                </div>
                <div className="h-4 w-1/3 bg-white/10 rounded mb-3 md:mb-4" />
                <div className="space-y-2.5 md:space-y-3">
                  <div className="h-12 w-full bg-card/50 rounded-lg border border-white/5" />
                  <div className="h-12 w-full bg-card/50 rounded-lg border border-white/5" />
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
