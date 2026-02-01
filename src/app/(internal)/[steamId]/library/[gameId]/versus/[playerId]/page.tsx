import type { Metadata } from 'next';
import { getGameById } from '@/app/actions/player/get-game-by-id';
import GameDetailsView from '@/components/library/game-id/game-header';
import { NotFoundGames } from '@/components/shared/not-found-games';
import { ChartColumnIncreasing, Trophy } from 'lucide-react';
import { getAchivementsById } from '@/app/actions/player/get-achivements-by-id';
import { getAllFriendsPlayer } from '@/app/actions/player/get-all-friends-player';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { buildTitle, SITE_URL } from '@/lib/seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AchivementsList } from '@/components/library/game-id/achivements-list';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { StatisticUser } from '@/components/library/game-id/statistic-user';
import { getGameBySteamIdAppId } from '@/app/actions/player/get-game-by-steam-id-app-id';

interface VersusPageProps {
  params: Promise<{ steamId: string; gameId: string; playerId: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ steamId: string; gameId: string; playerId: string }>;
}): Promise<Metadata> {
  const { steamId, gameId, playerId } = await params;

  const [game, player, secondPlayer] = await Promise.all([
    getGameById(gameId),
    getPlayerById(steamId),
    getPlayerById(playerId),
  ]);

  if (!game)
    return {
      title: buildTitle('Jogo não encontrado'),
      robots: { index: false },
    };

  const gameName = game.name;
  const playerName = player?.personaname ?? 'Perfil';
  const secondPlayerName = secondPlayer?.personaname ?? 'Perfil';
  const titleText = `${gameName} - ${playerName} Vs ${secondPlayerName}`;
  const description = `Compare conquistas de ${playerName} e ${secondPlayerName} em ${gameName}.`;

  return {
    title: buildTitle(titleText),
    description,
    openGraph: {
      title: `${titleText} | Steam Tracker`,
      description: description.slice(0, 200),
      url: `${SITE_URL}/${steamId}/library/${gameId}/versus/${playerId}`,
      type: 'website',
      images: game.header_image
        ? [{ url: game.header_image, width: 460, height: 215, alt: gameName }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleText} | Steam Tracker`,
      description: description.slice(0, 200),
      images: game.header_image ? [game.header_image] : undefined,
    },
  };
}

export default async function VersusPage({ params }: VersusPageProps) {
  const { steamId, gameId, playerId } = await params;

  const game = await getGameById(gameId);

  const [
    player,
    secondPlayer,
    friends,
    PlayerAchievements,
    SecondPlayerAchievements,
    gameBySteamIdAppId,
    gameBySteamIdAppIdPlayerId,
  ] = await Promise.all([
    getPlayerById(steamId),
    getPlayerById(playerId),
    getAllFriendsPlayer(steamId),
    getAchivementsById(steamId, gameId),
    getAchivementsById(playerId, gameId),
    getGameBySteamIdAppId(steamId, gameId),
    getGameBySteamIdAppId(playerId, gameId),
  ]);

  if (!game)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <NotFoundGames />
      </div>
    );

  return (
    <main className="flex w-full flex-col text-foreground min-h-screen">
      <GameDetailsView game={game} steamId={steamId} playedFriends={null} />

      <div className="z-50 px-4 md:px-6 py-8 md:py-10 w-full max-w-7xl mx-auto space-y-8 md:space-y-10">
        <Link
          href={`/${steamId}/library/${gameId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar ao jogo
        </Link>
        <div className="flex items-center justify-center flex-col gap-8">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3 flex-wrap">
            <Link
              href={`/${steamId}/overview`}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              <Avatar className="h-8 w-8 border-2 border-primary/50 shrink-0">
                <AvatarImage
                  src={player?.avatarfull}
                  alt={player?.personaname ?? ''}
                />
                <AvatarFallback className="bg-zinc-700 text-zinc-300 text-xs">
                  {player?.personaname?.slice(0, 2).toUpperCase() ?? '?'}
                </AvatarFallback>
              </Avatar>
              <span>{player?.personaname}</span>
            </Link>
            <span className="text-white">vs</span>
            <a
              href={`/${playerId}/overview`}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              <Avatar className="h-8 w-8 border-2 border-primary/50 shrink-0">
                <AvatarImage
                  src={secondPlayer?.avatarfull}
                  alt={secondPlayer?.personaname ?? 'Perfil Steam'}
                />
                <AvatarFallback
                  className="bg-zinc-700 text-zinc-300 text-xs"
                  title="Perfil não carregado (timeout ou indisponível)"
                >
                  {secondPlayer?.personaname?.slice(0, 2).toUpperCase() ??
                    playerId?.slice(-2) ??
                    '?'}
                </AvatarFallback>
              </Avatar>
              <span>{secondPlayer?.personaname ?? 'Perfil Steam'}</span>
            </a>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex items-center gap-2 lg:hidden pb-2 border-b border-white/10">
                <Avatar className="h-8 w-8 border-2 border-primary/50 shrink-0">
                  <AvatarImage
                    src={player?.avatarfull}
                    alt={player?.personaname ?? ''}
                  />
                  <AvatarFallback className="bg-zinc-700 text-zinc-300 text-xs">
                    {player?.personaname?.slice(0, 2).toUpperCase() ?? '?'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-lg font-bold text-primary">
                  {player?.personaname}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                <ChartColumnIncreasing className="text-primary w-5 h-5 " />
                Estatísticas
              </h2>
              <StatisticUser
                game={gameBySteamIdAppId ?? null}
                achievements={PlayerAchievements ?? []}
              />
              <div className="flex flex-col gap-6 md:gap-8">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                  <Trophy className="text-primary w-5 h-5 " />
                  Conquistas
                </h2>
                <div>
                  <AchivementsList
                    achievements={PlayerAchievements ?? []}
                    friends={friends ?? []}
                    game={game}
                    steamId={steamId}
                    showButton={false}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex items-center gap-2 lg:hidden pb-2 border-b border-white/10">
                <Avatar className="h-8 w-8 border-2 border-primary/50 shrink-0">
                  <AvatarImage
                    src={secondPlayer?.avatarfull}
                    alt={secondPlayer?.personaname ?? 'Perfil Steam'}
                  />
                  <AvatarFallback className="bg-zinc-700 text-zinc-300 text-xs">
                    {secondPlayer?.personaname?.slice(0, 2).toUpperCase() ??
                      playerId?.slice(-2) ??
                      '?'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-lg font-bold text-primary">
                  {secondPlayer?.personaname ?? 'Perfil Steam'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                <ChartColumnIncreasing className="text-primary w-5 h-5 " />
                Estatísticas
              </h2>
              <StatisticUser
                game={gameBySteamIdAppIdPlayerId ?? null}
                achievements={SecondPlayerAchievements ?? []}
              />
              <div className="flex flex-col gap-6 md:gap-8">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                  <Trophy className="text-primary w-5 h-5 " />
                  Conquistas
                </h2>
                <AchivementsList
                  achievements={SecondPlayerAchievements ?? []}
                  friends={friends ?? []}
                  game={game}
                  steamId={playerId}
                  showButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
