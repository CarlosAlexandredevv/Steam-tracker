import { SteamIdRouteParams } from '@/types/route-params';
import { NotFoundFriends } from '@/components/shared/not-found-friends';
import { getAllFriendsPlayer } from '@/app/actions/player/get-all-friends-player';
import { FriendCard } from '@/components/friends/friend-card';
import { HeaderFriends } from '@/components/friends/header-friends';
import { getPlayedFriends } from '@/app/actions/player/get-played-friends';

interface FriendsProps {
  params: SteamIdRouteParams;
  searchParams: Promise<{
    q?: string;
    gameId?: string;
  }>;
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
      <main className="flex w-full flex-col bg-background text-foreground min-h-screen p-4 md:p-8">
        <div className="flex h-full items-center justify-center py-10 px-4">
          <NotFoundFriends />
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen p-4 md:p-8 gap-8">
      <HeaderFriends friends={friendsFiltered} />

      {friendsFiltered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {friendsFiltered.map((friend) => (
            <FriendCard key={friend.steamid} friend={friend} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 px-4">
          <NotFoundFriends
            message={
              (q && q.trim()) || (gameId && gameId.trim())
                ? 'Não foi encontrado nenhum amigo para o filtro buscado.'
                : undefined
            }
          />
        </div>
      )}
    </main>
  );
}
