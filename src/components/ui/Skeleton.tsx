import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

/** Animated loading placeholder. Compose multiple Skeletons to match a layout. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700",
        className
      )}
      aria-hidden="true"
    />
  );
}

type SkeletonCardProps = {
  lines?: number;
  className?: string;
};

/** Pre-built skeleton layout for a standard content card. */
export function SkeletonCard({ lines = 3, className }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-xl border border-black/10 bg-white p-6 shadow-card", className)}>
      <Skeleton className="h-4 w-2/3" />
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-3", i === lines - 1 ? "w-3/4" : "w-full")}
          />
        ))}
      </div>
    </div>
  );
}

type SkeletonRowProps = {
  rows?: number;
  className?: string;
};

/** Pre-built skeleton layout for a list or table. */
export function SkeletonRows({ rows = 4, className }: SkeletonRowProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
