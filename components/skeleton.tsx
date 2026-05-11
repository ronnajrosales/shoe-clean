export function AnalysisSkeleton() {
  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      <div className="h-48 rounded-2xl bg-secondary/50 animate-pulse" />

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-secondary/50 animate-pulse" />
        <div className="h-4 w-32 rounded bg-secondary/50 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
          <div className="h-3 w-12 rounded bg-secondary/50 animate-pulse" />
          <div className="h-4 w-20 rounded bg-secondary/50 animate-pulse" />
        </div>
        <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
          <div className="h-3 w-12 rounded bg-secondary/50 animate-pulse" />
          <div className="h-4 w-24 rounded bg-secondary/50 animate-pulse" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-secondary/30 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-secondary/50 animate-pulse" />
          <div className="h-4 w-36 rounded bg-secondary/50 animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-3 w-12 rounded bg-secondary/50 animate-pulse" />
            <div className="h-3 w-20 rounded bg-secondary/50 animate-pulse" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-8 rounded bg-secondary/50 animate-pulse" />
            <div className="h-5 w-12 rounded bg-secondary/50 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-secondary/50 animate-pulse" />
            <div className="h-3 w-32 rounded bg-secondary/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
