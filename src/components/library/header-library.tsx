'use client';

import { SteamOwnedGame } from '@/types/steam';
import { LayoutGrid, Search, X } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { debounce, parseAsString, useQueryState } from 'nuqs';
import { Button } from '../ui/button';

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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 border-b border-white/10 pb-5 md:pb-8">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-primary" />
          Biblioteca de Jogos
        </h1>

        <p className="text-muted-foreground text-sm">
          {search ? (
            <>
              {games?.length ?? 0}{' '}
              {games?.length === 1 ? 'jogo encontrado' : 'jogos encontrados'} em
              sua coleção para a pesquisa{' '}
              <span className="text-white font-medium italic">
                &quot;{search}&quot;
              </span>
            </>
          ) : (
            <>Explorar todos os {games?.length ?? 0} jogos da sua coleção.</>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-3 min-w-0 md:min-w-[300px]">
        <InputGroup className="flex-1">
          <InputGroupInput
            placeholder="Buscar jogo..."
            value={search ?? ''}
            onChange={handleSearchUpdate}
          />
          <InputGroupAddon>
            <Search className="w-4 h-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        {search && search.trim() && (
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              setSearch('');
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
