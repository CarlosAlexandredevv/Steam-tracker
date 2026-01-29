import { Skeleton } from '@/components/ui/skeleton';

export default function GamePageLoading() {
  return (
    <main className="flex w-full flex-col text-foreground min-h-screen">
      <header className="relative min-h-[450px] w-full flex flex-col justify-end overflow-hidden">
        <Skeleton className="absolute inset-0 bg-white/5 rounded-none" />
        <div className="relative z-50 px-4 md:px-6 py-12 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-24 bg-white/10 rounded-md" />
              <Skeleton className="h-4 w-20 bg-white/10 rounded" />
            </div>
            <Skeleton className="h-14 w-full max-w-2xl bg-white/10 rounded-lg md:h-20" />
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-20 bg-white/10 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="z-50 px-4 md:px-6 py-8 md:py-10 w-full max-w-7xl mx-auto space-y-8 md:space-y-10">
        <div className="space-y-4">
          <Skeleton className="h-8 w-40 bg-white/10 rounded" />
          <Skeleton className="h-24 w-full bg-white/10 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-48 bg-white/10 rounded" />
            <Skeleton className="h-64 w-full bg-white/10 rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-36 bg-white/10 rounded" />
            <Skeleton className="h-48 w-full bg-white/10 rounded-lg" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-52 bg-white/10 rounded" />
          <Skeleton className="h-32 w-full bg-white/10 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-44 bg-white/10 rounded" />
              <Skeleton className="h-40 w-full bg-white/10 rounded-lg" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-56 bg-white/10 rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-24 w-full bg-white/10 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
