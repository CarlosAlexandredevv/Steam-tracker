import type { Metadata } from 'next';
import { getGameById } from '@/app/actions/player/get-game-by-id';
import { GalleryCards } from '@/components/library/game-id/gallery-cards';
import { PlayerCard } from '@/components/library/game-id/player-card';
import GameDetailsView from '@/components/library/game-id/game-header';
import { NotFoundGames } from '@/components/shared/not-found-games';
import {
  Info,
  Images,
  Play,
  Cpu,
  ChartColumnIncreasing,
  Globe,
  Trophy,
} from 'lucide-react';
import { SystemRequirements } from '@/components/library/game-id/system-requirements';
import { GameDescription } from '@/components/library/game-id/game-description';
import { getGameBySteamIdAppId } from '@/app/actions/player/get-game-by-steam-id-app-id';
import { StatisticUser } from '@/components/library/game-id/statistic-user';
import { getAchivementsById } from '@/app/actions/player/get-achivements-by-id';
import { statisticsGlobalsByGameId } from '@/app/actions/player/statistics-globals-by-game-id';
import { StatisticGlobal } from '@/components/library/game-id/statistic-global';
import { AchivementsList } from '@/components/library/game-id/achivements-list';
import { getPlayedFriends } from '@/app/actions/player/get-played-friends';
import { getAllFriendsPlayer } from '@/app/actions/player/get-all-friends-player';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { buildTitle, SITE_URL } from '@/lib/seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const STEAM_PROFILE_URL = 'https://steamcommunity.com/profiles';

interface GamePageProps {
  params: Promise<{ steamId: string; gameId: string }>;
  searchParams: Promise<{ playerId: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ steamId: string; gameId: string }>;
  searchParams: Promise<{ playerId?: string }>;
}): Promise<Metadata> {
  const { steamId, gameId } = await params;
  const { playerId } = await searchParams;

  const [game, player, secondPlayer] = await Promise.all([
    getGameById(gameId),
    getPlayerById(steamId),
    playerId ? getPlayerById(playerId) : Promise.resolve(null),
  ]);

  if (!game)
    return {
      title: buildTitle('Jogo não encontrado'),
      robots: { index: false },
    };

  const gameName = game.name;
  const playerName = player?.personaname ?? 'Perfil';
  const secondPlayerName = secondPlayer?.personaname ?? 'Perfil';
  const titleText = playerId
    ? `${gameName} - ${playerName} Vs ${secondPlayerName}`
    : `${gameName} - ${playerName}`;
  const description =
    game.short_description?.replace(/<[^>]*>/g, '').slice(0, 160) ??
    `Detalhes do jogo ${gameName} na biblioteca Steam de ${playerName}. Conquistas, estatísticas e requisitos.`;

  return {
    title: buildTitle(titleText),
    description,
    openGraph: {
      title: playerId
        ? `${titleText} | Steam Track`
        : `${gameName} | Steam Track`,
      description: description.slice(0, 200),
      url: `${SITE_URL}/${steamId}/library/${gameId}${
        playerId ? `?playerId=${playerId}` : ''
      }`,
      type: 'website',
      images: game.header_image
        ? [{ url: game.header_image, width: 460, height: 215, alt: gameName }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: playerId
        ? `${titleText} | Steam Track`
        : `${gameName} | Steam Track`,
      description: description.slice(0, 200),
      images: game.header_image ? [game.header_image] : undefined,
    },
  };
}

export default async function GamePage({
  params,
  searchParams,
}: GamePageProps) {
  const { steamId, gameId } = await params;
  const { playerId } = await searchParams;

  const game = await getGameById(gameId);
  console.log('jogo3',game)
  const gameBySteamIdAppId = await getGameBySteamIdAppId(steamId, gameId);

  const globalAchievements = await statisticsGlobalsByGameId(gameId);

  const playedFriends = await getPlayedFriends(steamId, gameId);
  const friends = await getAllFriendsPlayer(steamId);

  const player = await getPlayerById(steamId);
  const secondPlayer = await getPlayerById(playerId);

  const PlayerAchievements = await getAchivementsById(steamId, gameId);
  const SecondPlayerAchievements = await getAchivementsById(playerId, gameId);

  const showAllContent = !playerId;

  if (!game)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <NotFoundGames />
      </div>
    );

  return (
    <main className="flex w-full flex-col text-foreground min-h-screen">
      <GameDetailsView
        game={game}
        steamId={steamId}
        playedFriends={playedFriends}
        playerId={playerId}
      />

      {showAllContent && (
        <div className="z-50 px-4 md:px-6 py-8 md:py-10 w-full max-w-7xl mx-auto space-y-8 md:space-y-10">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
            <Info className="text-primary w-5 h-5 " />
            Sobre o Jogo
          </h2>
          <GameDescription game={game} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                <Images className="text-primary w-5 h-5 " />
                Galeria de Imagens
              </h2>
              <div className="flex-1">
                <GalleryCards game={game} />
              </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                <Play className="text-primary w-5 h-5 " />
                Jogar Agora
              </h2>
              <div className="flex-1">
                <PlayerCard game={game} />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
            <Cpu className="text-primary w-5 h-5 " />
            Requisitos do Sistema
          </h2>
          <SystemRequirements game={game} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                <ChartColumnIncreasing className="text-primary w-5 h-5 " />
                Estatísticas do Jogador
              </h2>
              <div className="flex-1">
                <StatisticUser
                  game={gameBySteamIdAppId ?? null}
                  achievements={PlayerAchievements ?? []}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
                <Globe className="text-primary w-5 h-5 " />
                Estatísticas Globais
              </h2>
              <div className="flex-1">
                <StatisticGlobal
                  globalAchievements={
                    globalAchievements?.achivementsGlobalData ?? {
                      achievementpercentages: { achievements: [] },
                    }
                  }
                  playerCount={
                    globalAchievements?.playersNowData ?? {
                      response: { player_count: 0, result: 0 },
                    }
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Trophy className="text-primary w-5 h-5 " />
              Conquistas do Jogador
            </h2>
            <AchivementsList
              achievements={PlayerAchievements ?? []}
              friends={friends ?? []}
              game={game}
              steamId={steamId}
            />
          </div>
        </div>
      )}

      {!showAllContent && (
        <div className="z-50 px-4 md:px-6 py-8 md:py-10 w-full max-w-7xl mx-auto space-y-8 md:space-y-10">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3 flex-wrap">
            <Trophy className="text-primary w-5 h-5 shrink-0" />
            <span className="text-white">Conquistas do</span>
            <a
              href={`${STEAM_PROFILE_URL}/${steamId}`}
              target="_blank"
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
            </a>
            <span className="text-white">vs</span>
            <a
              href={`${STEAM_PROFILE_URL}/${playerId}`}
              target="_blank"
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
            <AchivementsList
              achievements={PlayerAchievements ?? []}
              friends={friends ?? []}
              game={game}
              steamId={steamId}
              showButton={false}
            />
            <AchivementsList
              achievements={SecondPlayerAchievements ?? []}
              friends={friends ?? []}
              game={game}
              steamId={playerId}
              showButton={false}
            />
          </div>
        </div>
      )}
    </main>
  );
}
