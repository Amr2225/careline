import { Skeleton } from "@careline/ui/components/skeleton"

/** Full-page skeleton for the slot templates grid. */
export function TemplatesSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-40" />
        <header className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <Skeleton className="size-12 shrink-0 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-44" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-36 rounded-md" />
        </header>
      </div>

      <section className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="shadow-ambient flex items-center justify-between rounded-2xl border border-border/60 bg-card px-5 py-4"
          >
            <div className="space-y-2">
              <Skeleton className="h-2.5 w-14" />
              <Skeleton className="h-7 w-10" />
            </div>
            <Skeleton className="size-9 rounded-full" />
          </div>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <TemplateCardSkeleton key={i} />
        ))}
      </section>
    </div>
  )
}

function TemplateCardSkeleton() {
  return (
    <div className="shadow-ambient overflow-hidden rounded-2xl border border-border/70 bg-card">
      <div className="flex items-start justify-between gap-4 border-b border-border/40 px-6 py-5">
        <div className="flex items-start gap-4">
          <Skeleton className="size-14 shrink-0 rounded-2xl" />
          <div className="space-y-2 pt-0.5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-4 px-6 py-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-2.5 w-14" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border/40 bg-muted/20 px-6 py-4">
        <Skeleton className="h-5 w-20" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
}
