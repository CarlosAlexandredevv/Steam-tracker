'use client';

import { SteamOwnedGame } from '@/types/steam';
import { LayoutGrid, Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { debounce, parseAsString, useQueryState } from 'nuqs';

interface HeaderLibraryProps {
  games: SteamOwnedGame[] | null;
}

export function HeaderLibrary({ games }: HeaderLibraryProps) {
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
          <LayoutGrid className="w-8 h-8 text-primary" />
          Biblioteca de Jogos
        </h1>
        <p className="text-muted-foreground text-sm">
          Explorar todos os {games?.length} jogos da sua coleção.
        </p>
      </div>

      <div>
        <InputGroup>
          <InputGroupInput
            placeholder="Buscar jogo..."
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
