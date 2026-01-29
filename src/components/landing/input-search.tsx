'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function extractSteamId(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const idMatch = trimmed.match(/steamcommunity\.com\/id\/([^/?#]+)/i);
  if (idMatch) return idMatch[1].trim();

  const profilesMatch = trimmed.match(
    /steamcommunity\.com\/profiles\/([^/?#]+)/i,
  );
  if (profilesMatch) return profilesMatch[1].trim();

  return trimmed;
}

export function InputSearch() {
  const [value, setValue] = useState('');
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    const steamId = extractSteamId(value);
    if (steamId) router.push(`/${steamId}/overview`);
  }

  return (
    <div className="relative flex items-center bg-card border border-white/10 rounded-xl p-2.5 md:p-3 shadow-2xl">
      <Search className="w-5 h-5 text-muted-foreground ml-3 shrink-0" />
      <input
        type="text"
        placeholder="Cole seu Steam ID ou URL do perfil..."
        className="min-w-0 flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none px-3 md:px-4 py-3 md:py-3.5"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        type="button"
        disabled={!value.trim()}
        onClick={handleSubmit}
        className="shrink-0 whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 md:px-6 md:py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm md:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Analisar
      </button>
    </div>
  );
}
