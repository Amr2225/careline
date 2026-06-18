import { Skeleton } from "@careline/ui/components/skeleton"
import { StatCardsSkeleton } from "./states"

/** Full-page skeleton for the appointments day view. */
export function AppointmentsDaySkeleton() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2.5">
          <Skeleton className="h-9 w-52" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      </header>

      <StatCardsSkeleton />

      <section className="shadow-ambient overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div className="flex items-center justify-between gap-4 border-b border-border/60 p-5">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
        <div className="divide-y divide-border/40">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-5"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-2.5 rounded-full" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="size-4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/** Skeleton for the 7-column week grid (rendered inside the slots section). */
export function WeekViewSkeleton() {
  return (
    <div className="grid grid-cols-2 divide-y divide-border/40 sm:grid-cols-4 sm:divide-x sm:divide-y-0 lg:grid-cols-7">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex min-h-[280px] flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border/40 px-3 py-2.5">
            <div className="space-y-1.5">
              <Skeleton className="h-2.5 w-8" />
              <Skeleton className="h-5 w-6" />
            </div>
            <Skeleton className="h-3 w-9" />
          </div>
          <div className="flex-1 space-y-1.5 p-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className="h-7 w-full rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
