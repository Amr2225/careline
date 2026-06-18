import { Skeleton } from "@careline/ui/components/skeleton"

/** Skeleton fallback for the template edit/detail page. */
export function TemplateDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-7 w-40" />
        <div className="shadow-ambient mt-4 overflow-hidden rounded-2xl border border-border/70 bg-card">
          <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex items-start gap-5 p-6">
              <Skeleton className="size-16 shrink-0 rounded-2xl" />
              <div className="space-y-2.5 pt-0.5">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-64 max-w-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border/40 border-t border-border/40 lg:border-t-0 lg:border-l">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex flex-col justify-center gap-2 p-6">
                  <Skeleton className="h-2.5 w-16" />
                  <Skeleton className="h-7 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <section
              key={i}
              className="shadow-ambient space-y-5 rounded-2xl border border-border/70 bg-card p-6"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-56 max-w-full" />
              </div>
              <Skeleton className="h-9 w-full" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </section>
          ))}
        </div>
        <aside className="space-y-6">
          <Skeleton className="h-56 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </aside>
      </div>
    </div>
  )
}
