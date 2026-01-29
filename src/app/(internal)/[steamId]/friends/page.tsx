import type { Metadata } from 'next';
import { SteamIdRouteParams } from '@/types/route-params';
import { NotFoundFriends } from '@/components/shared/not-found-friends';
import { getAllFriendsPlayer } from '@/app/actions/player/get-all-friends-player';
import { FriendCard } from '@/components/friends/friend-card';
import { HeaderFriends } from '@/components/friends/header-friends';
import { getPlayedFriends } from '@/app/actions/player/get-played-friends';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { buildTitle } from '@/lib/seo';

interface FriendsProps {
  params: SteamIdRouteParams;
  searchParams: Promise<{
    q?: string;
    gameId?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: SteamIdRouteParams;
}): Promise<Metadata> {
  const { steamId } = await params;
  const player = await getPlayerById(steamId);
  if (!player)
    return { title: buildTitle('Perfil não encontrado'), robots: { index: false } };
  return {
    title: buildTitle(`Amigos - ${player.personaname}`),
    description: `Lista de amigos Steam de ${player.personaname}. Filtre por nome ou por jogo.`,
  };
}

export default async function Friends({ params, searchParams }: FriendsProps) {
  const { steamId } = await params;
  const { q, gameId } = await searchParams;

  const friends = await getAllFriendsPlayer(steamId);

  const playedFriendsData =
    gameId && gameId.trim() ? await getPlayedFriends(steamId, gameId) : null;

  const friendsFiltered = friends.filter((friend) => {
    const matchesName =
      q && q.trim()
        ? friend.personaname.toLowerCase().includes(q.toLowerCase())
        : true;

    const matchesGame =
      gameId && gameId.trim()
        ? playedFriendsData?.friends?.some(
            (playedFriend) => playedFriend.steamid === friend.steamid,
          )
        : true;

    return matchesName && matchesGame;
  });

  if (!friends || friends.length === 0) {
    return (
      <main className="flex w-full flex-col bg-background text-foreground min-h-screen">
        <div className="px-4 md:px-6 w-full max-w-7xl mx-auto py-6 md:py-10">
          <div className="flex h-full items-center justify-center py-12 md:py-16">
            <NotFoundFriends />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen">
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto py-6 md:py-10 space-y-6 md:space-y-10">
        <HeaderFriends friends={friendsFiltered} />

        {friendsFiltered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {friendsFiltered.map((friend) => (
              <FriendCard key={friend.steamid} friend={friend} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-10">
            <NotFoundFriends
              message={
                (q && q.trim()) || (gameId && gameId.trim())
                  ? 'Não foi encontrado nenhum amigo para o filtro buscado.'
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </main>
  );
}
