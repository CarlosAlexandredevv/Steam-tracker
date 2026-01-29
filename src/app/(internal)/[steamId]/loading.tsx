import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex w-full flex-col bg-background text-foreground min-h-[60vh] px-4 md:px-6 py-8 md:py-10">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64 bg-white/10 rounded-lg" />
          <Skeleton className="h-4 w-full max-w-md bg-white/10 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-48 w-full bg-white/10 rounded-lg aspect-video"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
