import Image from 'next/image';
import Link from 'next/link';
import { SteamPlayer, SteamOwnedGame } from '@/types/steam';
import { Badge } from '../ui/badge';
import {
  Gamepad2,
  Star,
  Clock,
  CalendarDays,
  Activity,
  ExternalLink,
} from 'lucide-react';

interface PlayerHeaderProps {
  player: SteamPlayer;
  games: SteamOwnedGame[];
}

export function PlayerHeader({ player, games }: PlayerHeaderProps) {
  const gameBiggerplaytime = games?.sort(
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
  const recentHours = (recentPlaytimeMinutes / 60).toFixed(1);
  const hasRecentActivity = recentPlaytimeMinutes > 0;

  const accountCreationDate = player?.timecreated
    ? new Date(player.timecreated * 1000)
    : null;

  const accountYears = accountCreationDate
    ? new Date().getFullYear() - accountCreationDate.getFullYear()
    : 0;

  return (
    <div className="relative z-10 flex h-full items-end p-6 md:p-10">
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

        <div className="flex flex-1 flex-col justify-end gap-3 pb-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-6xl text-left">
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
                <Gamepad2 className="size-4 text-blue-400" />
                <span>{games?.length ?? 0} Jogos</span>
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
                <span>{accountYears} Anos</span>
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
      </div>
    </div>
  );
}
