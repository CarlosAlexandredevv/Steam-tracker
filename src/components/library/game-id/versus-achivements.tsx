'use client';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Swords, Loader2 } from 'lucide-react';
import { SteamGameData, SteamPlayer } from '@/types/steam';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { useRouter } from 'next/navigation';

interface VersusAchivementsProps {
  friends: SteamPlayer[];
  game: SteamGameData;
  steamId: string;
  showButton?: boolean;
}

const versusUrl = (
  ownerSteamId: string,
  gameAppId: number,
  otherSteamId: string,
) => `/${ownerSteamId}/library/${gameAppId}/versus/${otherSteamId}`;

export function VersusAchivements({
  friends,
  game,
  steamId,
  showButton = true,
}: VersusAchivementsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [player, setPlayer] = useState<SteamPlayer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const searchPlayer = async () => {
      const steamIdPattern = /^\d{17}$/;
      if (!searchValue) {
        setPlayer(null);
        setIsLoading(false);
        return;
      }

      if (steamIdPattern.test(searchValue)) {
        setIsLoading(true);
        try {
          const playerData = await getPlayerById(searchValue);
          setPlayer(playerData || null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setPlayer(null);
        setIsLoading(false);
      }
    };

    searchPlayer();
  }, [searchValue]);

  function handleCompareWith(otherSteamId: string) {
    setIsNavigating(true);
    setOpen(false);
    setSearchValue('');
    setPlayer(null);
    router.push(versusUrl(steamId, game.steam_appid, otherSteamId));
  }

  return (
    <div className="flex flex-col gap-4">
      {showButton && (
        <Button
          variant="outline"
          className="hover:bg-primary/10 hover:text-primary duration-300 cursor-pointer"
          onClick={() => {
            setOpen(true);
            setIsNavigating(false);
          }}
          disabled={isNavigating}
        >
          {isNavigating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando comparação...
            </>
          ) : (
            <>
              Comparar com outro jogador <Swords className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}

      <CommandDialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSearchValue('');
            setPlayer(null);
            setIsLoading(false);
            setIsNavigating(false);
          }
        }}
      >
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={setSearchValue}
            placeholder="Buscar amigo ou Steam ID..."
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Buscando jogador...
                </span>
              </div>
            ) : (
              <>
                {friends.length > 0 && (
                  <CommandGroup heading="Amigos">
                    {friends.map((friend) => (
                      <CommandItem
                        key={friend.steamid}
                        value={`${friend.personaname} ${friend.steamid}`}
                        onSelect={() => handleCompareWith(friend.steamid)}
                        disabled={isNavigating}
                        className="flex items-center gap-3 p-2 cursor-pointer"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={friend.avatarfull}
                            alt={friend.personaname}
                          />
                          <AvatarFallback>
                            {friend.personaname.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <span className="font-medium text-sm leading-none">
                            {friend.personaname}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ID: {friend.steamid}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {player && (
                  <CommandGroup heading="Jogador encontrado (Steam ID)">
                    <CommandItem
                      key={player?.steamid}
                      value={`${player?.personaname} ${player?.steamid}`}
                      onSelect={() => handleCompareWith(player.steamid)}
                      disabled={isNavigating}
                      className="flex items-center gap-3 p-2 cursor-pointer"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={player?.avatarfull}
                          alt={player?.personaname}
                        />
                        <AvatarFallback>
                          {player?.personaname.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <span className="font-medium text-sm leading-none">
                          {player?.personaname}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ID: {player?.steamid}
                        </span>
                      </div>
                    </CommandItem>
                  </CommandGroup>
                )}
                <CommandEmpty>Nenhum jogador encontrado.</CommandEmpty>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
