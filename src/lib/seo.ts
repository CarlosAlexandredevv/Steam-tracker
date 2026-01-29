/**
 * Constantes e helpers para SEO (Metadata, Open Graph, Twitter).
 * Ajuste SITE_URL em produção para a URL real do site.
 */

export const SITE_NAME = 'Steam Track';
export const SITE_DESCRIPTION =
  'Analise sua biblioteca Steam: perfis, jogos, conquistas e estatísticas. Compare com amigos e domine seus dados de jogador.';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://steam-track.vercel.app';
export const SITE_IMAGE = `${SITE_URL}/logo.png`;

export const defaultOpenGraph = {
  type: 'website' as const,
  locale: 'pt_BR' as const,
  url: SITE_URL,
  siteName: SITE_NAME,
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  images: [{ url: SITE_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
};

export const defaultTwitter = {
  card: 'summary_large_image' as const,
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  images: [SITE_IMAGE],
};

export function buildTitle(...parts: string[]): string {
  const full = parts.filter(Boolean).join(' | ');
  return full ? `${full} | ${SITE_NAME}` : SITE_NAME;
}
