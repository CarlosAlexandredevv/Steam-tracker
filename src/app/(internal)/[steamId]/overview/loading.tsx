import { Skeleton } from '@/components/ui/skeleton';

export default function OverviewLoading() {
  return (
    <div className="flex w-full flex-col bg-background text-foreground gap-6 md:gap-8 overflow-x-hidden max-w-full">
      {/* Header skeleton (min-h-96 + player info) */}
      <header className="relative min-h-96 w-full overflow-hidden">
        <Skeleton className="absolute inset-0 bg-white/5 rounded-none" />
        <div className="relative z-10 flex items-end px-4 md:px-6 py-6 md:py-8 w-full max-w-7xl mx-auto">
          <div className="flex w-full flex-col md:flex-row md:items-end gap-5 md:gap-6">
            <Skeleton className="h-28 w-28 rounded-full shrink-0 md:h-36 md:w-36 bg-white/10" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-9 w-48 bg-white/10 rounded" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((i) => (
                  <Skeleton
                    key={i as number}
                    className="h-8 w-24 bg-white/10 rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Games section skeleton */}
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-8 w-40 bg-white/10 rounded" />
          <Skeleton className="h-10 w-64 bg-white/10 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((i) => (
            <Skeleton
              key={i as number}
              className="h-48 w-full bg-white/10 rounded-lg aspect-video"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
