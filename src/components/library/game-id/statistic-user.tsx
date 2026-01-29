import { SteamOwnedGame, SteamPlayerAchievement } from '@/types/steam';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, Trophy, Activity } from 'lucide-react';

interface StatisticUserProps {
  game: SteamOwnedGame | null;
  achievements: SteamPlayerAchievement[];
}

export function StatisticUser({ game, achievements }: StatisticUserProps) {
  if (!game) {
    return null;
  }

  const hoursTotal = Math.floor(game?.playtime_forever / 60);
  const minutesTotal = game?.playtime_forever % 60;
  const hoursTwoWeeks = game?.playtime_2weeks
    ? Math.floor(game?.playtime_2weeks / 60)
    : 0;

  const formatDate = (timestamp: number) => {
    if (!timestamp || timestamp === 0) return 'Sem registro';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(timestamp * 1000));
  };

  const lastPlayedDate = new Date(game?.rtime_last_played * 1000);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const isAbandoned =
    game?.rtime_last_played > 0 && lastPlayedDate < threeMonthsAgo;
  const isRecentlyPlayed = (game?.playtime_2weeks || 0) > 0;

  const totalAchievements = achievements?.length || 0;
  const achievedAchievements =
    achievements?.filter((achievement) => achievement.achieved === 1).length ||
    0;

  const progressPercentage =
    totalAchievements > 0
      ? (achievedAchievements / totalAchievements) * 100
      : 0;

  return (
    <Card className="h-full">
      <CardContent className="h-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <Clock className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">
                Tempo jogado total
              </p>
              <p className="text-3xl font-black text-white italic">
                {hoursTotal || 0}h{' '}
                <span className="text-sm font-medium not-italic text-white/50">
                  {minutesTotal || 0}m
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Calendar className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">
                Última vez jogado
              </p>
              <p className="text-lg font-bold text-white/90">
                {formatDate(game?.rtime_last_played)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <Trophy className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1 space-y-2">
              {totalAchievements === 0 ? (
                <p className="text-xs text-white/50">
                  Sem dados de conquistas para este jogo.
                </p>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">
                      Conquistas desbloqueadas
                    </p>
                    <span className="text-sm font-black text-white italic">
                      {achievedAchievements} / {totalAchievements} (
                      {progressPercentage.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress
                    value={progressPercentage}
                    className="h-1.5 bg-white/5"
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 pt-2 border-t border-white/5">
            <Activity className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">
                Status
              </p>
              <div className="flex flex-col gap-3">
                {isRecentlyPlayed && (
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-tighter">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>
                      Jogando recentemente ({hoursTwoWeeks}h nas últimas 2
                      semanas)
                    </span>
                  </div>
                )}

                {isAbandoned ? (
                  <div className="flex items-center gap-2 text-red-500/70 font-bold text-xs uppercase tracking-tighter">
                    <span>
                      Título Abandonado (Sem atividade há mais de 3 meses)
                    </span>
                  </div>
                ) : (
                  !isRecentlyPlayed && (
                    <div className="text-primary font-bold text-xs uppercase tracking-tighter">
                      Sem atividade recente
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
