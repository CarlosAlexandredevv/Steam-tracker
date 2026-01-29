import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Sitemap para SEO. Inclui a landing page.
 * Rotas dinâmicas ([steamId], [gameId]) não são listadas aqui pois
 * dependem de dados externos (Steam API). Para perfis/jogos específicos,
 * considere gerar URLs via getPlayerById/getAllGames em um cron ou on-demand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];
}
