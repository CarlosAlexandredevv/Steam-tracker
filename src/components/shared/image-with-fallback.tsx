'use client';

import Image from 'next/image';
import { useState } from 'react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=90';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

/** Exibe fallback quando a URL (ex.: CDN Steam) retorna 404 ou erro. */
export function ImageWithFallback({
  src,
  alt,
  fill = true,
  sizes,
  className,
  priority,
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const effectiveSrc = failed || !src ? FALLBACK_IMAGE : src;

  return (
    <Image
      src={effectiveSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
