import { Skeleton } from '@/components/ui/skeleton';

export default function FriendsLoading() {
  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen">
      <div className="px-4 md:px-6 w-full max-w-7xl mx-auto py-6 md:py-10 space-y-6 md:space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 border-b border-white/10 pb-5 md:pb-8">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded bg-white/10" />
              <Skeleton className="h-9 w-40 bg-white/10 rounded" />
            </div>
            <Skeleton className="h-4 w-56 bg-white/10 rounded" />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
            <Skeleton className="h-10 w-full sm:w-64 rounded-lg bg-white/10" />
            <Skeleton className="h-10 w-full sm:w-48 rounded-lg bg-white/10" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {Array.from({ length: 12 }, (_, i) => i).map((i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 overflow-hidden bg-card p-4 flex flex-col items-center gap-3"
            >
              <Skeleton className="h-20 w-20 rounded-full shrink-0 bg-white/10" />
              <div className="w-full space-y-2 flex flex-col items-center">
                <Skeleton className="h-4 w-20 bg-white/10 rounded" />
                <Skeleton className="h-3 w-14 bg-white/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
