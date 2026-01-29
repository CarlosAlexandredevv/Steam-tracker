import { InputSearch } from './input-search';

export function LandingCta() {
  return (
    <section id="faq" className="py-20 md:py-28 text-center">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4 md:mb-6 text-foreground uppercase">
          Pronto para começar?
        </h2>
        <p className="text-muted-foreground mb-8 md:mb-10 max-w-xl mx-auto text-sm md:text-base">
          Digite seu Steam ID ou URL do perfil abaixo e veja suas estatísticas
          transformadas em insights visuais.
        </p>

        <div className="max-w-xl mx-auto">
          <InputSearch />
        </div>
      </div>
    </section>
  );
}
