import { Skeleton } from "@careline/ui/components/skeleton"

export function NextAvailableSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <Skeleton className="h-4 w-40 bg-emerald-800/10" />
      <Skeleton className="mt-3 h-8 w-56 bg-slate-200" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-4/5 bg-slate-200" />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 to-emerald-700 p-6 text-white shadow-[0_18px_44px_rgba(6,95,70,0.28)]">
        <Skeleton className="h-3 w-28 bg-emerald-50/20" />
        <Skeleton className="mt-3 h-6 w-36 bg-emerald-50/25" />
        <Skeleton className="mt-3 h-12 w-40 bg-emerald-50/25" />
        <Skeleton className="mt-3 h-3 w-24 bg-emerald-50/20" />

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full bg-emerald-50/20" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-16 bg-emerald-50/20" />
                <Skeleton className="h-5 w-12 bg-emerald-50/25" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <Skeleton className="h-12 w-full rounded-2xl bg-emerald-800/20" />
        <Skeleton className="h-11 w-full rounded-2xl bg-emerald-50" />
      </div>
    </div>
  )
}
