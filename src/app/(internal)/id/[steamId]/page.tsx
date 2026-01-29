import { SteamIdRouteParams } from '@/types/route-params';
import { notFound, redirect } from 'next/navigation';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';

interface IdProps {
  params: SteamIdRouteParams;
}

export default async function Id({ params }: IdProps) {
  const { steamId } = await params;

  const player = await getPlayerById(steamId);

  if (!player) {
    return notFound();
  }

  redirect(`/${player.steamid}/overview`);
}
