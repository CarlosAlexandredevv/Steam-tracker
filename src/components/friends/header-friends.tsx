'use client';

import { SteamPlayer } from '@/types/steam';
import { Gamepad2, User, Users, X } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { debounce, parseAsString, useQueryState } from 'nuqs';
import { Button } from '../ui/button';

interface HeaderFriendsProps {
  friends: SteamPlayer[] | null;
}

export function HeaderFriends({ friends }: HeaderFriendsProps) {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withOptions({
      shallow: false,
    }),
  );

  const [gameId, setGameId] = useQueryState(
    'gameId',
    parseAsString.withOptions({
      shallow: false,
    }),
  );

  function handleSearchUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value || null, {
      limitUrlUpdates: value ? debounce(500) : undefined,
    });
  }

  function handleGameIdUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setGameId(value || null, {
      limitUrlUpdates: value ? debounce(500) : undefined,
    });
  }

  const isFiltering = (search && search.trim()) || (gameId && gameId.trim());

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          Amigos Steam
        </h1>

        <p className="text-muted-foreground text-sm">
          {isFiltering ? (
            <span className="flex items-center gap-1 flex-wrap">
              Jogos encontrados em sua coleção para a pesquisa:
              {search && (
                <span className="text-white font-bold italic">
                  &quot;{search}&quot;
                </span>
              )}
              {search && gameId && <span> e </span>}
              {gameId && (
                <>
                  no Game ID:{' '}
                  <span className="text-primary font-bold">{gameId}</span>
                </>
              )}
            </span>
          ) : (
            <>Explorar todos os {friends?.length ?? 0} amigos da sua coleção.</>
          )}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <InputGroup className="w-full sm:w-64">
          <InputGroupInput
            placeholder="Nome do amigo..."
            value={search ?? ''}
            onChange={handleSearchUpdate}
          />
          <InputGroupAddon>
            <User className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="w-full sm:w-48">
          <InputGroupInput
            placeholder="ID do Jogo"
            value={gameId ?? ''}
            onChange={handleGameIdUpdate}
          />
          <InputGroupAddon>
            <Gamepad2 className="size-4 text-primary" />
          </InputGroupAddon>
        </InputGroup>

        {isFiltering && (
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              setSearch(null);
              setGameId(null);
            }}
            className="hover:bg-primary duration-300 ease-out cursor-pointer"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
