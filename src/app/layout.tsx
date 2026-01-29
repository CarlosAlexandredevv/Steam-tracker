import type { Metadata } from 'next';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  defaultOpenGraph,
  defaultTwitter,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Steam',
    'biblioteca Steam',
    'estatísticas Steam',
    'conquistas Steam',
    'perfil Steam',
    'jogos Steam',
  ],
  authors: [
    {
      name: 'CarlosAlexandredevv',
      url: 'https://github.com/CarlosAlexandredevv',
    },
  ],
  creator: 'CarlosAlexandredevv',
  openGraph: defaultOpenGraph,
  twitter: defaultTwitter,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/new-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
