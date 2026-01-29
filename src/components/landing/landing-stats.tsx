import { LayoutGrid, Users, Trophy, Clock } from 'lucide-react';
import { LandingStatCard } from './landing-stat-card';

const STATS = [
  { label: 'Jogos Indexados', value: '50K+', icon: LayoutGrid },
  { label: 'Perfis Analisados', value: '1.2M', icon: Users },
  { label: 'Conquistas Rastreadas', value: '10M+', icon: Trophy },
  { label: 'Horas Contabilizadas', value: '500K+', icon: Clock },
] as const;

export function LandingStats() {
  return (
    <section className="border-y border-white/10 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 py-14 md:py-20 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((stat) => (
            <LandingStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
