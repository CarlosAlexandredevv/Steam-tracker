'use client';

import { useRef, useState } from 'react';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '../ui/input-group';
import { Search } from 'lucide-react';
import { getPlayerById } from '@/app/actions/player/get-player-by-id';
import { SteamPlayer } from '@/types/steam';
import { Popover, PopoverAnchor } from '@/components/ui/popover';
import { PlayerPopoverContent } from './player-popover-content';

export function SearchPlayer() {
  const [player, setPlayer] = useState<SteamPlayer | null>(null);
  const [open, setOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}
