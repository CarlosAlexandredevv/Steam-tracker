import { SteamPlayer } from "@/types/steam";
import { CheckCircle2, Info } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface PlayerPopoverContentProps {
  player: SteamPlayer | null;
  notFound: boolean;
}

export function PlayerPopoverContent({ player, notFound }: PlayerPopoverContentProps) {
  const pathname = usePathname();
  const routePathnames = pathname.split("/")[2];
  
  return (
    <PopoverContent
    side="bottom"
    align="start"
    sideOffset={8}
    className={cn(
    "w-[var(--radix-popover-trigger-width)]",
    notFound && "p-3",
    player && "hover:cursor-pointer hover:bg-muted"
  )}
>
      {player ? (
        <Link href={`/${player.steamid}/${routePathnames}`} className="space-y-4">
          <PopoverHeader>
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src={player.avatarmedium} alt={player.personaname} />
                <AvatarFallback>
                  {player.personaname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <PopoverTitle className="mb-0">{player.personaname}</PopoverTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <PopoverDescription className="mt-1">
                  Steam ID: {player.steamid}
                </PopoverDescription>
              </div>
            </div>
          </PopoverHeader>
        </Link>
      ) : notFound ? (
        <PopoverHeader>
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-muted p-2">
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <PopoverTitle>Jogador não encontrado</PopoverTitle>
              <PopoverDescription className="text-xs">
                Não foi possível encontrar um jogador com este Steam ID. 
              </PopoverDescription>
            </div>
          </div>
        </PopoverHeader>
      ) : null}
    </PopoverContent>
  );
}
