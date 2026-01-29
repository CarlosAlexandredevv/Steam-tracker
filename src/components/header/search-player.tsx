'use client';

import { useRef, useState, useEffect } from 'react';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '../ui/input-group';
import { Search, X } from 'lucide-react';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { SteamPlayer } from '@/types/steam';
import { Popover, PopoverAnchor } from '@/components/ui/popover';
import { PlayerPopoverContent } from './player-popover-content';
import { Button } from '../ui/button';

export function SearchPlayer() {
  const [player, setPlayer] = useState<SteamPlayer | null>(null);
  const [open, setOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  function handleSearchPlayer(value: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!value.trim()) {
      setOpen(false);
      setNotFound(false);
      setPlayer(null);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      const searchPlayer = await getPlayerById(value);

      if (searchPlayer) {
        setPlayer(searchPlayer);
        setNotFound(false);
        setOpen(true);
      } else {
        setPlayer(null);
        setNotFound(true);
        setOpen(true);
      }
    }, 500);
  }

  const searchInput = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <InputGroup className="w-full lg:max-w-96">
          <InputGroupInput
            placeholder="Steam ID"
            onChange={(e) => handleSearchPlayer(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </PopoverAnchor>
      <PlayerPopoverContent player={player} notFound={notFound} />
    </Popover>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        className="sm:hidden shrink-0"
        aria-label="Buscar jogador"
      >
        <Search className="size-5" />
      </Button>

      {/* Input expandido no mobile */}
      {mobileSearchOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-white/10 p-4 sm:hidden">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverAnchor asChild>
                  <InputGroup className="w-full">
                    <InputGroupInput
                      ref={inputRef}
                      placeholder="Steam ID"
                      onChange={(e) => handleSearchPlayer(e.target.value)}
                    />
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                  </InputGroup>
                </PopoverAnchor>
                <PlayerPopoverContent player={player} notFound={notFound} />
              </Popover>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setMobileSearchOpen(false);
                setOpen(false);
                setPlayer(null);
                setNotFound(false);
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
              aria-label="Fechar busca"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Input para desktop - sempre visível no desktop */}
      <div className="hidden sm:block w-full max-w-[300px]">{searchInput}</div>
    </>
  );
}
