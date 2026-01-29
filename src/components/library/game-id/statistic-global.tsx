import {
  SteamCurrentPlayersResponse,
  SteamGetGlobalAchievementPercentagesForAppResponse,
} from '@/types/steam';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, Globe, Award, Diamond } from 'lucide-react';

interface StatisticGlobalProps {
  playerCount: SteamCurrentPlayersResponse | null;
  globalAchievements: SteamGetGlobalAchievementPercentagesForAppResponse | null;
}

export function StatisticGlobal({
  playerCount,
  globalAchievements,
}: StatisticGlobalProps) {
  const currentPlayers = playerCount?.response?.player_count || 0;

  const achievementsList =
    globalAchievements?.achievementpercentages?.achievements || [];

  const totalGlobalPercentage = achievementsList.reduce((acc, curr) => {
    return acc + Number(curr.percent);
  }, 0);

  const globalAverageProgress =
    achievementsList.length > 0
      ? totalGlobalPercentage / achievementsList.length
      : 0;

  const rarestAchievement =
    achievementsList.length > 0
      ? achievementsList.reduce((min, curr) =>
          Number(curr.percent) < Number(min.percent) ? curr : min,
        )
      : { percent: 0 };

  const rarestPercent = Number(rarestAchievement.percent);

  return (
    <Card className="h-full">
      <CardContent className="h-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 ">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Users className="text-primary mt-1 shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">
                  Jogadores Online Agora
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-black text-white italic">
                    {currentPlayers.toLocaleString('pt-BR')}
                  </p>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase tracking-widest">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Globe className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">
                Servidores Steam
              </p>
              <p className="text-lg font-bold text-white/90">
                Disponibilidade Global
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <Award className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1 space-y-2">
              {achievementsList.length === 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">
                      Média Global de Conquistas
                    </p>
                    <span className="text-sm font-black text-white italic">
                      —
                    </span>
                  </div>
                  <p className="text-xs text-white/50">
                    Sem dados de conquistas para este jogo.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">
                      Média Global de Conquistas
                    </p>
                    <span className="text-sm font-black text-white italic">
                      {globalAverageProgress.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={globalAverageProgress}
                    className="h-1.5 bg-white/5"
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 pt-2 border-t border-white/5">
            <Diamond className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">
                Desafio Supremo
              </p>
              <div className="flex flex-col gap-1">
                {achievementsList.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white/90">
                        {rarestPercent.toFixed(1)}%
                      </span>
                      <span className="text-xs text-white/40 font-medium">
                        dos jogadores possuem a conquista mais rara
                      </span>
                    </div>
                    {rarestPercent < 1 && (
                      <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                        Raridade Extrema
                      </span>
                    )}
                  </>
                ) : (
                  <div className="text-white/30 font-bold text-xs uppercase tracking-tighter">
                    Sem dados de conquistas
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
