import { BarChart3, LayoutGrid, Swords } from 'lucide-react';
import { LandingFeatureCard } from './landing-feature-card';

interface FeatureConfig {
  title: string;
  description: string;
  icon: typeof BarChart3;
  items?: string[];
  tags?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

const FEATURES: FeatureConfig[] = [
  {
    title: 'Overview Detalhado',
    description:
      'Visualize badges de horas jogadas, jogo favorito e histórico recente em um painel unificado.',
    icon: BarChart3,
    items: ['Top 5 Amigos', 'Status em tempo real', 'Biblioteca completa'],
  },
  {
    title: 'Biblioteca Inteligente',
    description:
      'Busque e filtre seus jogos instantaneamente. Encontre títulos esquecidos com busca em tempo real.',
    icon: LayoutGrid,
    tags: ['Busca em tempo real', 'Filtros por nome'],
  },
  {
    title: 'Modo Versus',
    description:
      'Compare suas conquistas diretamente com amigos. Descubra quem é o verdadeiro completista em jogos específicos.',
    icon: Swords,
    ctaLabel: 'Ver Exemplo',
    ctaHref: '76561198354798459/library/730/versus/76561198137531424',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-3 md:mb-4 text-foreground uppercase">
            Tudo sobre seu perfil
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Uma suíte completa de ferramentas para entender seus hábitos de
            jogo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature) => (
            <LandingFeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              items={feature.items}
              tags={feature.tags}
              ctaLabel={feature.ctaLabel}
              ctaHref={feature.ctaHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
