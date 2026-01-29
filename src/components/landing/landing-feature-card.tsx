import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface LandingFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items?: string[];
  tags?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function LandingFeatureCard({
  title,
  description,
  icon: Icon,
  items,
  tags,
  ctaLabel,
  ctaHref = '/',
}: LandingFeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      <div className="relative p-6 md:p-8">
        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-5 md:mb-6 text-primary">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2 md:mb-3 text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
          {description}
        </p>

        {items && items.length > 0 && (
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-black/40 border border-white/10 rounded-md text-xs text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {ctaLabel && (
          <Link
            href={ctaHref}
            className="mt-5 md:mt-6 inline-flex text-primary text-sm font-bold items-center gap-1 hover:gap-2 transition-all duration-300"
          >
            {ctaLabel}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
