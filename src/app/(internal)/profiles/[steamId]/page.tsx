import { SteamIdRouteParams } from '@/types/route-params';
import { redirect } from 'next/navigation';

interface ProfileProps {
  params: SteamIdRouteParams;
}

export default async function Profile({ params }: ProfileProps) {
  const { steamId } = await params;

  redirect(`/${steamId}/overview`);
}
