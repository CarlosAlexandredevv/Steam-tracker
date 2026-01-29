import { Skeleton } from '@/components/ui/skeleton';

export default function FriendsLoading() {
  return (
    <main className="flex w-full flex-col bg-background text-foreground min-h-screen px-4 md:px-6 py-8 md:py-10">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header skeleton (HeaderFriends style) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 border-b border-white/10 pb-5 md:pb-8">
          <div className="space-y-1.5">
            <Skeleton className="h-9 w-56 bg-white/10 rounded" />
            <Skeleton className="h-4 w-40 bg-white/10 rounded" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-10 w-full sm:w-48 bg-white/10 rounded-lg" />
            <Skeleton className="h-10 w-full sm:w-32 bg-white/10 rounded-lg" />
          </div>
        </div>

        {/* Friends grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }, (_, i) => i).map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/5"
            >
              <Skeleton className="h-14 w-14 rounded-full shrink-0 bg-white/10" />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-5 w-3/4 bg-white/10 rounded" />
                <Skeleton className="h-4 w-1/2 bg-white/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
