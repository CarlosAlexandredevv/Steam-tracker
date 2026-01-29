import type { Metadata } from 'next';
import {
  LandingHeader,
  LandingHero,
  LandingFeatures,
  LandingPreview,
  LandingCta,
  LandingFooter,
} from '@/components/landing';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} - Analise sua biblioteca Steam`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: SITE_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Analise sua biblioteca Steam`,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <LandingHeader />

      <main className="flex flex-col">
        <LandingHero />
        <LandingFeatures />
        <LandingPreview />
        <LandingCta />
      </main>

      <LandingFooter />
    </div>
  );
}
