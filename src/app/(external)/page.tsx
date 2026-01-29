import {
  LandingHeader,
  LandingHero,
  LandingFeatures,
  LandingPreview,
  LandingCta,
  LandingFooter,
} from '@/components/landing';

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
