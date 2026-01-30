import type { Metadata } from 'next';
import { Header } from '@/components/header/header';
import { SteamIdRouteParams } from '@/types/route-params';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { buildTitle } from '@/lib/seo';

interface LayoutProps {
  children: React.ReactNode;
  params: SteamIdRouteParams;
}

export async function generateMetadata({
  params,
}: {
  params: SteamIdRouteParams;
}): Promise<Metadata> {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);

  if (!player) {
    return {
      title: buildTitle('Perfil não encontrado'),
      robots: { index: false, follow: false },
    };
  }

  const title = `${player.personaname} - Perfil Steam`;
  const description = `Perfil Steam de ${player.personaname}. Biblioteca de jogos, conquistas, amigos e estatísticas.`;

  return {
    title: buildTitle(title),
    description,
    openGraph: {
      title: `${player.personaname} | Steam Tracker`,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/${steamId}/overview`,
      type: 'profile',
      images: player.avatarfull
        ? [{ url: player.avatarfull, width: 184, height: 184, alt: player.personaname }]
        : undefined,
    },
    twitter: {
      card: 'summary',
      title: `${player.personaname} | Steam Tracker`,
      description,
    },
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <main className="min-h-screen">
      <Header params={params} />
      <div className="flex flex-1 flex-col overflow-x-hidden max-w-full">
        {children}
      </div>
    </main>
  );
}
