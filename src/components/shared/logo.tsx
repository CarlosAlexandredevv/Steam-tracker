import Image from 'next/image';

const LOGO_SRC = '/logo2.png';
const LOGO_ALT = 'Steam Track';

type LogoSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<LogoSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
  lg: 'w-12 h-12 md:w-14 md:h-14',
};

interface LogoProps {
  size?: LogoSize;
  className?: string;
  priority?: boolean;
}

export function Logo({
  size = 'md',
  className = '',
  priority = false,
}: LogoProps) {
  return (
    <div
      className={`relative shrink-0 ${sizeClasses[size]} ${className}`}
      aria-hidden
    >
      <Image
        src={LOGO_SRC}
        alt={LOGO_ALT}
        fill
        className="object-contain"
        priority={priority}
        sizes="(max-width: 768px) 32px, 40px"
      />
    </div>
  );
}
