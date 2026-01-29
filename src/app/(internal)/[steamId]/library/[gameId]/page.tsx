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
} from 'lucide-react';
import { SystemRequirements } from '@/components/library/game-id/system-requirements';
import { GameDescription } from '@/components/library/game-id/game-description';
import { getGameBySteamIdAppId } from '@/app/actions/player/get-game-by-steam-id-app-id';
import { StatisticUser } from '@/components/library/game-id/statistic-user';
import { getAchivementsById } from '@/app/actions/player/get-achivements-by-id';
import { statisticsGlobalsByGameId } from '@/app/actions/player/statistics-globals-by-game-id';
import { StatisticGlobal } from '@/components/library/game-id/statistic-global';

interface GamePageProps {
  params: Promise<{ steamId: string; gameId: string }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { steamId, gameId } = await params;
  const game = await getGameById(gameId);

  const gameBySteamIdAppId = await getGameBySteamIdAppId(steamId, gameId);
  const achievements = await getAchivementsById(steamId, gameId);
  const globalAchievements = await statisticsGlobalsByGameId(gameId);

  const translationsByApiName = new Map(
    (achievements ?? [])
      .filter((a) => a.apiname && a.name)
      .map((a) => [a.apiname, a.name] as const),
  );

  const achivementsTranslate =
    globalAchievements?.achivementsGlobalData.achievementpercentages.achievements.map(
      (a) => ({
        ...a,
        translatedName: translationsByApiName.get(a.name) ?? a.name,
      }),
    ) ?? [];

  if (!game)
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <NotFoundGames />
      </div>
    );

  return (
    <main className="flex w-full flex-col text-foreground min-h-screen">
      <GameDetailsView game={game} />

      <div className="z-50 px-6 md:px-12 py-12 w-full max-w-7xl mx-auto space-y-12">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
          <Info className="text-primary w-5 h-5 " />
          Sobre o Jogo
        </h2>
        <GameDescription game={game} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Images className="text-primary w-5 h-5 " />
              Galeria de Imagens
            </h2>
            <div className="flex-1">
              <GalleryCards game={game} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
              <ChartColumnIncreasing className="text-primary w-5 h-5 " />
              Estatísticas do Jogador
            </h2>
            <StatisticUser
              game={gameBySteamIdAppId}
              achievements={achievements ?? []}
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Globe className="text-primary w-5 h-5 " />
              Estatísticas Globais
            </h2>
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
    </main>
  );
}
