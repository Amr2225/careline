import { Skeleton } from "@careline/ui/components/skeleton"

function DetailRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5">
      <Skeleton className="size-9 rounded-xl bg-emerald-50" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-16 bg-slate-200" />
        <Skeleton className="h-4 w-36 bg-slate-200" />
      </div>
    </div>
  )
}

export function AppointmentDetailSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="-ml-1 flex w-fit items-center gap-1.5 rounded-full px-2 py-1">
        <Skeleton className="size-3.5 rounded-full bg-emerald-800/15" />
        <Skeleton className="h-3 w-20 bg-emerald-800/15" />
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 to-emerald-700 p-6 text-white shadow-[0_18px_44px_rgba(6,95,70,0.28)]">
        <Skeleton className="h-3 w-28 bg-emerald-50/20" />
        <Skeleton className="mt-3 h-14 w-24 bg-emerald-50/25" />
        <Skeleton className="mt-4 h-3 w-56 bg-emerald-50/20" />
        <Skeleton className="mt-2 h-3 w-32 bg-emerald-50/15" />
      </div>

      <div className="mt-5 grid gap-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <DetailRowSkeleton key={i} />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-800/15 bg-emerald-50/60 p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="size-9 shrink-0 rounded-xl bg-emerald-800/20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48 bg-emerald-800/15" />
            <Skeleton className="h-3 w-full bg-emerald-800/10" />
            <Skeleton className="h-3 w-4/5 bg-emerald-800/10" />
          </div>
        </div>
      </div>

      <Skeleton className="mt-5 h-12 w-full rounded-2xl bg-rose-100" />
    </div>
  )
}
