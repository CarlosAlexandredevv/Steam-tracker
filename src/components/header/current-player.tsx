import { SteamPlayer } from '@/types/steam';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CurrentPlayerProps {
  player: SteamPlayer;
}

export function CurrentPlayer({ player }: CurrentPlayerProps) {
  const isOnline = player.personastate !== 0;

  return (
    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
      <div className="flex flex-col items-end  md:flex">
        <span className="text-sm font-medium text-white leading-none mb-1">
          {player.personaname}
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={player.profileurl}
            target="_blank"
            className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
          >
            Perfil Steam <ExternalLink size={10} />
          </Link>
        </div>
      </div>

      <div className="relative">
        <Avatar className="h-9 w-9 border border-white/20">
          <AvatarImage src={player.avatarmedium} alt={player.personaname} />
          <AvatarFallback>{player.personaname.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#09090b] ${
            isOnline ? 'bg-green-500' : 'bg-zinc-500'
          }`}
        />
      </div>
    </div>
  );
}
