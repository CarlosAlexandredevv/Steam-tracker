"use client";

import {  useState, useEffect } from "react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";
import { Search } from "lucide-react";
import { getPlayerById } from "@/app/actions/user/get-player-by-id";
import { SteamPlayer } from "@/types/steam";
import {
  Popover,
  PopoverAnchor,
} from "@/components/ui/popover"
import { PlayerPopoverContent } from "./player-popover-content";

export function SearchPlayer() {
const [steamId, setSteamId] = useState("");
const [player, setPlayer] = useState<SteamPlayer | null>(null);
const [open, setOpen] = useState(false);
const [notFound, setNotFound] = useState(false);

useEffect(() => {
    const timeoutId = setTimeout(async () => {
        if(!steamId.trim()) {
            setOpen(false);
            setNotFound(false);
            return;
        }
        
        const searchPlayer = await getPlayerById(steamId);
        if(searchPlayer) {
            setPlayer(searchPlayer);
            setNotFound(false);
            setOpen(true);
        } else {
            setPlayer(null);
            setNotFound(true);
            setOpen(true);
        }
    }, 500);

    return () => clearTimeout(timeoutId);
}, [steamId]);

return (
  <div className="flex flex-col gap-2">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
      <InputGroup className="w-full lg:max-w-96">
          <InputGroupInput 
            placeholder="Steam ID"  
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)} 
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