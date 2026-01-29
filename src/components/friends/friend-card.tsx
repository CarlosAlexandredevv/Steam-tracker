import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { SteamPlayer } from '@/types/steam';

function getPersonaStatus(state: number) {
  const states: Record<number, { label: string; color: string }> = {
    0: { label: 'Offline', color: 'bg-slate-500' },
    1: { label: 'Online', color: 'bg-green-500' },
    2: { label: 'Ocupado', color: 'bg-red-500' },
    3: { label: 'Ausente', color: 'bg-yellow-500' },
    4: { label: 'Inativo', color: 'bg-blue-400' },
  };
  return states[state] || { label: 'Desconhecido', color: 'bg-gray-500' };
}

interface FriendCardProps {
  friend: SteamPlayer;
}

export function FriendCard({ friend }: FriendCardProps) {
  const status = getPersonaStatus(friend.personastate);

  return (
    <Card className="overflow-hidden hover:opacity-80 transition-all border-muted/50">
      <Link href={`/${friend.steamid}/overview`}>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-center">
            <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
              <AvatarImage src={friend.avatarfull} alt={friend.personaname} />
              <AvatarFallback>
                {friend.personaname.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0 text-center">
          <h2
            className="font-medium truncate text-sm"
            title={friend.personaname}
          >
            {friend.personaname}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <span className={`h-2 w-2 rounded-full ${status.color}`} />
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
              {status.label}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
