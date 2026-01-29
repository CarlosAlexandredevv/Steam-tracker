import { LucideIcon } from 'lucide-react';

interface LandingStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function LandingStatCard({
  label,
  value,
  icon: Icon,
}: LandingStatCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-black/40 border border-white/10 p-3.5 rounded-full mb-4 text-primary">
        <Icon size={24} />
      </div>
      <h3 className="text-3xl font-black text-foreground italic mb-2">
        {value}
      </h3>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </div>
  );
}
