import { Skeleton } from '@/components/ui/skeleton';

const skeletonClass = 'animate-pulse bg-muted/90 dark:bg-white/10';

export default function OverviewLoading() {
  return (
    <div className="flex w-full flex-col bg-background text-foreground gap-6 md:gap-8 overflow-x-hidden max-w-full">
      <header className="relative min-h-96 w-full flex flex-col justify-end overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none bg-muted/80 dark:bg-white/5 animate-pulse" />
        <div className="relative z-10 flex items-end px-4 md:px-6 py-6 md:py-8 w-full max-w-7xl mx-auto">
          <div className="flex w-full flex-col items-start gap-5 md:gap-6 md:flex-row md:items-end">
            <Skeleton
              className={`h-28 w-28 shrink-0 rounded-full border-4 border-white/10 md:h-36 md:w-36 ${skeletonClass}`}
            />

            <div className="flex flex-1 flex-col justify-end gap-3 pb-1 min-w-0 max-w-full">
              <div className="flex items-center gap-3 min-w-0 max-w-full">
                <Skeleton
                  className={`h-9 w-40 rounded md:h-14 md:w-56 ${skeletonClass}`}
                />
                <Skeleton
                  className={`h-5 w-5 shrink-0 rounded md:h-6 md:w-6 ${skeletonClass}`}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton
                  className={`h-9 w-20 rounded-full px-3 py-2 ${skeletonClass}`}
                />
                <Skeleton
                  className={`h-9 w-24 rounded-full px-3 py-2 ${skeletonClass}`}
                />
                <Skeleton
                  className={`h-9 w-16 rounded-full px-3 py-2 ${skeletonClass}`}
                />
                <Skeleton
                  className={`h-9 w-28 rounded-full px-3 py-2 ${skeletonClass}`}
                />
                <Skeleton
                  className={`h-9 w-44 rounded-full px-3 py-2 ${skeletonClass}`}
                />
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Skeleton
                  className={`h-4 w-4 shrink-0 rounded ${skeletonClass}`}
                />
                <Skeleton
                  className={`h-4 w-24 rounded ${skeletonClass}`}
                />
              </div>
              <div className="flex items-center md:pl-2 -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton
                    key={i}
                    className={`h-10 w-10 rounded-full border-2 border-background md:h-12 md:w-12 ${skeletonClass}`}
                  />
                ))}
                <Skeleton
                  className={`h-10 w-10 rounded-full border-2 border-background md:h-12 md:w-12 flex items-center justify-center ${skeletonClass}`}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full overflow-x-hidden py-6 md:py-8">
        <div className="px-4 md:px-6 w-full max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6 border-b border-white/10 pb-5 md:pb-6">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <Skeleton
                  className={`h-8 w-8 shrink-0 rounded ${skeletonClass}`}
                />
                <Skeleton className={`h-9 w-28 rounded ${skeletonClass}`} />
              </div>
              <Skeleton
                className={`h-4 w-72 max-w-full rounded ${skeletonClass}`}
              />
            </div>
            <Skeleton
              className={`h-9 w-36 shrink-0 rounded-md px-3 py-2 ${skeletonClass}`}
            />
          </div>
        </div>

        <div className="mt-5 md:mt-6 px-4 md:px-6 w-full max-w-7xl mx-auto">
          <div className="relative flex items-center gap-2 md:gap-3 w-full">
            <Skeleton
              className={`h-10 w-10 shrink-0 rounded-full hidden md:block ${skeletonClass}`}
            />
            <div className="flex flex-1 gap-3 md:gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton
                  key={i}
                  className={`min-w-[calc(50%-0.375rem)] sm:min-w-[calc(33.333%-0.5rem)] md:min-w-[calc(25%-0.5rem)] lg:min-w-[14.28%] aspect-2/3 rounded-xl shrink-0 ${skeletonClass}`}
                />
              ))}
            </div>
            <Skeleton
              className={`h-10 w-10 shrink-0 rounded-full hidden md:block ${skeletonClass}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
