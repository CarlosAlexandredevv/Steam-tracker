'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PlayNowButton({
  appId,
  className,
}: {
  appId?: number;
  className?: string;
}) {
  return (
    <Button
      type="button"
      className={className}
      onClick={() => window.open(`steam://run/${appId}`, '_blank')}
      disabled={!appId}
    >
      <ShoppingCart size={22} className="fill-current" />
      Jogar Agora
    </Button>
  );
}
