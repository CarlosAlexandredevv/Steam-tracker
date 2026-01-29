import { Skeleton } from '@/components/ui/skeleton';
import { logLoading } from '@/lib/action-logger';

export default function LibraryLoading() {
  logLoading('library');
  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen">
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto py-6 md:py-10 space-y-6 md:space-y-10">
        {/* Header skeleton - espelha HeaderLibrary (título + ícone, subtítulo, input de busca) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 border-b border-white/10 pb-5 md:pb-8">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded bg-white/10" />
              <Skeleton className="h-9 w-52 bg-white/10 rounded" />
            </div>
            <Skeleton className="h-4 w-64 bg-white/10 rounded" />
          </div>
          <div className="flex items-center gap-2 md:gap-3 min-w-0 md:min-w-[300px]">
            <Skeleton className="h-10 flex-1 min-w-0 rounded-lg bg-white/10" />
          </div>
        </div>

        {/* Grid skeleton - mesmo grid da library (2-6 cols) e GameCard aspect-[2/3] rounded-xl */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {Array.from({ length: 12 }, (_, i) => i).map((i) => (
            <Skeleton
              key={i}
              className="aspect-2/3 w-full rounded-xl bg-white/10"
            />
        {/* Games grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full bg-white/10 rounded-lg aspect-video" />
              <Skeleton className="h-5 w-3/4 bg-white/10 rounded" />
              <Skeleton className="h-4 w-1/2 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
