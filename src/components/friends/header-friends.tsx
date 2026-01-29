'use client';

import { SteamPlayer } from '@/types/steam';
import { Search, Users } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { debounce, parseAsString, useQueryState } from 'nuqs';

interface HeaderFriendsProps {
  friends: SteamPlayer[] | null;
}

export function HeaderFriends({ friends }: HeaderFriendsProps) {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      shallow: false,
    }),
  );

  function handleSearchUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates:
        event.target.value.length !== 0 ? debounce(500) : undefined,
    });
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          Amigos Steam
        </h1>
        <p className="text-muted-foreground text-sm">
          Explorar {friends?.length ?? 0} amigos deste jogador.
        </p>
      </div>

      <div>
        <InputGroup>
          <InputGroupInput
            placeholder="Buscar amigo..."
            value={search ?? ''}
            onChange={handleSearchUpdate}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
