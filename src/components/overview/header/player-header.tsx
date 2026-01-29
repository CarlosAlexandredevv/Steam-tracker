import Image from 'next/image';
import Link from 'next/link';
import { SteamPlayer, SteamOwnedGame } from '@/types/steam';
import { Badge } from '@/components/ui/badge';
import {
  Gamepad2,
  Star,
  Clock,
  CalendarDays,
  Activity,
  ExternalLink,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getAllFriendsPlayer } from '@/app/actions/player/get-all-friends-player';

interface PlayerHeaderProps {
  player: SteamPlayer;
  games: SteamOwnedGame[];
}

export async function PlayerHeader({ player, games }: PlayerHeaderProps) {
  const friends = await getAllFriendsPlayer(player.steamid);
  const totalFriendsCount = friends?.length ?? 0;

  const displayFriends = friends?.slice(0, 5) ?? [];
  const remainingCount = totalFriendsCount - displayFriends.length;

  const gameBiggerplaytime = [...games].sort(
    (a, b) => b.playtime_forever - a.playtime_forever,
  )[0];

  const favoriteGameHours = gameBiggerplaytime
    ? Math.round(gameBiggerplaytime.playtime_forever / 60).toLocaleString(
        'pt-BR',
      )
    : 0;

  const totalPlaytimeMinutes =
    games?.reduce((acc, curr) => acc + curr.playtime_forever, 0) ?? 0;
  const totalHoursLifetimeNumber = Math.round(totalPlaytimeMinutes / 60);
  const totalHoursLifetime = totalHoursLifetimeNumber.toLocaleString('pt-BR');

  const recentPlaytimeMinutes =
    games?.reduce((acc, curr) => acc + (curr.playtime_2weeks || 0), 0) ?? 0;

  const recentHours = Math.round((recentPlaytimeMinutes / 60) * 10) / 10;

  const hasRecentActivity = recentPlaytimeMinutes > 0;

  const accountCreationDate = player?.timecreated
    ? new Date(player.timecreated * 1000)
    : null;

  const accountYears = accountCreationDate
    ? new Date().getFullYear() - accountCreationDate.getFullYear()
    : 0;

  return (
    <div className="relative z-10 flex items-end px-4 md:px-6 py-6 w-full max-w-7xl mx-auto">
      <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-end">
        <div className="relative shrink-0">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/10 bg-black shadow-2xl md:h-36 md:w-36">
            {player?.avatarfull && (
              <Image
                src={player.avatarfull}
                alt={player.personaname ?? 'Avatar'}
                fill
                className="object-cover rounded-full border-2 border-primary"
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-3 pb-1 min-w-0 max-w-full">
          <div className="flex items-center gap-3 min-w-0 max-w-full">
            <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-6xl text-left wrap-break-word max-w-full">
              {player?.personaname ?? 'Desconhecido'}
            </h1>
            {player?.profileurl && (
              <Link
                href={player.profileurl}
                target="_blank"
                className="opacity-50 hover:opacity-100 transition-opacity text-white"
                title="Ver perfil na Steam"
              >
                <ExternalLink className="size-5 md:size-6" />
              </Link>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {(games?.length ?? 0) > 0 && (
              <Badge
                className="bg-black/40 px-3 py-2 text-white flex items-center gap-2"
                variant="outline"
              >
                <Gamepad2 className="size-4 text-primary" />
                <span>
                  {games?.length ?? 0} {games?.length === 1 ? 'Jogo' : 'Jogos'}
                </span>
              </Badge>
            )}

            {totalHoursLifetimeNumber > 0 && (
              <Badge
                className="bg-black/40 px-3 py-2 text-white flex items-center gap-2"
                variant="outline"
              >
                <Clock className="size-4 text-green-400" />
                <span>{totalHoursLifetime}h Totais</span>
              </Badge>
            )}

            {accountYears > 0 && (
              <Badge
                className="bg-black/40 px-3 py-2 text-white flex items-center gap-2"
                variant="outline"
              >
                <CalendarDays className="size-4 text-orange-400" />
                <span>
                  {accountYears} {accountYears === 1 ? 'Ano' : 'Anos'}
                </span>
              </Badge>
            )}

            {hasRecentActivity && (
              <Badge
                className="bg-black/40 px-3 py-2 text-white flex items-center gap-2"
                variant="outline"
              >
                <Activity className="size-4 text-red-400" />
                <span>{recentHours}h recentes</span>
              </Badge>
            )}

            {gameBiggerplaytime && favoriteGameHours !== '0' && (
              <Badge
                className="bg-black/40 px-3 py-2 text-white flex items-center gap-2 border-yellow-500/30"
                variant="outline"
              >
                <Star className="size-4 text-yellow-400" />
                <span>
                  Mestre em{' '}
                  <span className="font-bold text-yellow-100">
                    {gameBiggerplaytime.name}
                  </span>
                  <span className="ml-1 text-gray-400 text-xs">
                    ({favoriteGameHours}h)
                  </span>
                </span>
              </Badge>
            )}
          </div>
        </div>
        {totalFriendsCount > 0 && (
          <div className="flex flex-col md:items-end gap-2 group cursor-pointer">
            <Link
              href={`/${player.steamid}/friends`}
              className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-white transition-colors"
            >
              <Users className="size-4" />
              <span className="font-medium">Amigos ({totalFriendsCount})</span>
            </Link>

            <div className="flex items-center md:pl-2">
              <div className="flex items-center -space-x-3 hover:space-x-1 transition-all duration-300 ease-out py-1">
                <TooltipProvider delayDuration={100}>
                  {displayFriends.map((friend, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-background bg-zinc-800 transition-transform hover:scale-110 hover:z-20 hover:border-primary/50">
                          <Link href={`/${friend?.steamid}/overview`}>
                            <Avatar className="h-full w-full">
                              <AvatarImage
                                src={friend?.avatarfull}
                                alt={friend?.personaname}
                              />
                              <AvatarFallback className="bg-zinc-700 text-[10px] text-zinc-300">
                                {friend?.personaname
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="text-xs font-bold"
                      >
                        <p>{friend?.personaname}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>

                {remainingCount > 0 && (
                  <Link
                    href={`/${player.steamid}/friends`}
                    className="relative z-0 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full border-2 border-background bg-zinc-800 text-xs font-bold text-zinc-300 transition-transform hover:scale-110 hover:z-20 hover:bg-zinc-700 hover:text-white"
                  >
                    +{remainingCount}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
