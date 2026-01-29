import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Assumindo que você tem o progresso do shadcn
import { SteamPlayerAchievement } from '@/types/steam';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NotFoundAchievements } from '@/components/shared/not-found-achievements';

interface AchivementsListProps {
  achievements: SteamPlayerAchievement[];
}

export function AchivementsList({ achievements }: AchivementsListProps) {
  const total = achievements.length;
  const completed = achievements.filter((a) => a.achieved === 1).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) {
    return <NotFoundAchievements />;
  }

  const sortedAchievements = [...achievements].sort(
    (a, b) => b.achieved - a.achieved,
  );

  const useScroll = sortedAchievements.length > 24;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Conquistas</CardTitle>
            <CardDescription>
              {completed} de {total} desbloqueadas ({percentage}%)
            </CardDescription>
          </div>
        </div>
        <Progress value={percentage} className="h-2 mt-4" />
      </CardHeader>

      <CardContent>
        <TooltipProvider>
          {useScroll ? (
            <ScrollArea className="h-[360px] pr-3">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {sortedAchievements.map((achievement) => (
                  <Tooltip key={achievement.apiname}>
                    <TooltipTrigger asChild>
                      <div className="relative group transition-transform hover:scale-110">
                        <Image
                          src={
                            (achievement.achieved === 1
                              ? achievement.icon
                              : achievement.icongray) ?? ''
                          }
                          alt={achievement.name}
                          width={64}
                          height={64}
                          className={`rounded-md border-2 ${
                            achievement.achieved === 1
                              ? 'border-yellow-500/50 shadow-sm'
                              : 'border-transparent opacity-60 grayscale-[0.5]'
                          }`}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-[200px] text-center"
                    >
                      <p className="font-bold">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                      {achievement.percent !== undefined && (
                        <p className="text-[10px] mt-1 text-muted-foreground">
                          Raridade global:{' '}
                          {typeof achievement.percent === 'string'
                            ? achievement.percent
                            : achievement.percent.toFixed(1)}
                          %
                        </p>
                      )}
                      {achievement.achieved === 1 &&
                        achievement.unlocktime > 0 && (
                          <p className="text-[10px] mt-1 text-yellow-500">
                            Desbloqueado em:{' '}
                            {new Date(
                              achievement.unlocktime * 1000,
                            ).toLocaleDateString()}
                          </p>
                        )}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {sortedAchievements.map((achievement) => (
                <Tooltip key={achievement.apiname}>
                  <TooltipTrigger asChild>
                    <div className="relative group transition-transform hover:scale-110">
                      <Image
                        src={
                          (achievement.achieved === 1
                            ? achievement.icon
                            : achievement.icongray) ?? ''
                        }
                        alt={achievement.name}
                        width={64}
                        height={64}
                        className={`rounded-md border-2 ${
                          achievement.achieved === 1
                            ? 'border-yellow-500/50 shadow-sm'
                            : 'border-transparent opacity-60 grayscale-[0.5]'
                        }`}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[200px] text-center"
                  >
                    <p className="font-bold">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                    {achievement.percent !== undefined && (
                      <p className="text-[10px] mt-1 text-muted-foreground">
                        Raridade global:{' '}
                        {typeof achievement.percent === 'string'
                          ? achievement.percent
                          : achievement.percent.toFixed(1)}
                        %
                      </p>
                    )}
                    {achievement.achieved === 1 &&
                      achievement.unlocktime > 0 && (
                        <p className="text-[10px] mt-1 text-yellow-500">
                          Desbloqueado em:{' '}
                          {new Date(
                            achievement.unlocktime * 1000,
                          ).toLocaleDateString()}
                        </p>
                      )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
