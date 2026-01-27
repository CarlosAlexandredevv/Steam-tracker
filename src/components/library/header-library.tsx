import { LayoutGrid, Search } from 'lucide-react';

interface HeaderLibraryProps {
  totalGames: number;
}

export function HeaderLibrary({ totalGames }: HeaderLibraryProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-primary" />
          Biblioteca de Jogos
        </h1>
        <p className="text-muted-foreground text-sm">
          Explorar todos os {totalGames} jogos da sua coleção.
        </p>
      </div>

      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar jogo..."
          className="w-full h-10 rounded-md border border-input bg-secondary/50 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}

