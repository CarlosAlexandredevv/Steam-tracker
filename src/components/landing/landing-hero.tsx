import { InputSearch } from './input-search';

export function LandingHero() {
  return (
    <section className="relative pt-20 md:pt-28 pb-24 md:pb-36 overflow-hidden min-h-auto flex items-center justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 max-w-7xl">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-5 md:mb-6 text-foreground uppercase leading-none">
          Domine sua biblioteca <br />
          <span className="text-primary">de jogos Steam</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
          Analise perfis detalhados, compare conquistas com amigos e descubra
          estatísticas ocultas da sua biblioteca em uma interface moderna e
          veloz.
        </p>

        <div className="max-w-xl mx-auto relative group mt-10 md:mt-12">
          <InputSearch />
        </div>
      </div>
    </section>
  );
}
