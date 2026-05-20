"use client";

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-card border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 h-4 w-1/3 rounded bg-muted" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-5/6 rounded bg-muted" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-5 p-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-card border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 h-3 w-2/3 rounded bg-muted" />
            <div className="h-6 w-1/3 rounded bg-muted" />
          </div>
        ))}
      </div>
      {/* Main cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="animate-pulse rounded-card border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 h-4 w-1/4 rounded bg-muted" />
          <div className="h-48 rounded bg-muted" />
        </div>
        <CardSkeleton />
      </div>
      <CardSkeleton />
    </div>
  );
}

export function ViewSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <CardSkeleton />
      <CardSkeleton />
      <div className="animate-pulse rounded-card border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 h-4 w-2/5 rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-4/5 rounded bg-muted" />
          <div className="h-3 w-3/5 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
