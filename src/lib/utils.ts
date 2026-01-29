import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function safeJsonParse<T>(
  response: Response | null | undefined,
): Promise<T | null> {
  if (!response) {
    return null;
  }

  try {
    const text = await response.text();

    if (!text || text.trim().length === 0) {
      return null;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    console.error('[safeJsonParse] Erro ao fazer parse do JSON:', error);
    return null;
  }
}

export async function getImageUrlWithFallback(
  imageUrl: string,
): Promise<string> {
  try {
    const response = await fetch(imageUrl, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
      headers: {
        Range: 'bytes=0-1024',
      },
    });

    if (
      !response.ok ||
      response.status === 404 ||
      response.headers.get('content-type')?.includes('text/html')
    ) {
      return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=90';
    }

    const text = await response.text();
    if (text.trim().startsWith('<html') || text.includes('404 Not Found')) {
      return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=90';
    }

    return imageUrl;
  } catch {
    return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=90';
  }
}
