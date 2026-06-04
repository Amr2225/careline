import { Skeleton } from "@careline/ui/components/skeleton"
import { StatCardsSkeleton } from "../../_components/states"

/** Full-page skeleton for the "All slots" list view. */
export function SlotsListSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-40" />
        <header className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <Skeleton className="size-12 shrink-0 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-32 rounded-md" />
            <Skeleton className="size-8 rounded-md" />
          </div>
        </header>
      </div>

      <StatCardsSkeleton />

      <section className="shadow-ambient overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-9 w-full sm:max-w-md" />
          <Skeleton className="h-9 w-44" />
        </div>
        <div className="divide-y divide-border/40">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
