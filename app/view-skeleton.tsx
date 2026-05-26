"use client";

export function ViewSkeleton() {
  return (
    <div className="animate-fade-in space-y-3 p-3">
      {/* Header bar - mimics real view header */}
      <div className="animate-pulse rounded-card border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-muted" />
          <div className="h-4 w-2/5 rounded bg-muted" />
        </div>
        <div className="h-3 w-3/5 rounded bg-muted mb-3" />
        {/* Chart area - circle + bars */}
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-4/5 rounded bg-muted" />
            <div className="h-3 w-3/5 rounded bg-muted" />
          </div>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-card border border-border bg-card p-3">
            <div className="mb-1.5 h-3 w-2/3 rounded bg-muted" />
            <div className="h-5 w-1/3 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Content cards */}
      <div className="grid gap-2 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-card border border-border bg-card p-4">
            <div className="mb-2 h-4 w-1/3 rounded bg-muted" />
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-5/6 rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
