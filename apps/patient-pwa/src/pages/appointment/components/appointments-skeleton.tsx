import { Skeleton } from "@careline/ui/components/skeleton"

function AppointmentRowSkeleton({
  muted = false,
}: {
  muted?: boolean
}) {
  return (
    <li
      className={`flex items-center justify-between rounded-2xl border border-slate-100 p-3.5 ${
        muted ? "bg-slate-50/40" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <Skeleton
          className={`rounded-xl ${muted ? "size-9 bg-slate-200" : "size-11 bg-emerald-50"}`}
        />
        <div className="space-y-2">
          <Skeleton className="h-3 w-32 bg-slate-200" />
          <Skeleton className="h-5 w-20 bg-slate-200" />
          {!muted ? (
            <Skeleton className="h-4 w-16 rounded-full bg-sky-100" />
          ) : null}
        </div>
      </div>
      <Skeleton className="size-4 rounded-full bg-slate-200" />
    </li>
  )
}

export function AppointmentsSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <Skeleton className="size-14 rounded-2xl bg-emerald-800/20" />
      <Skeleton className="mt-6 h-4 w-28 bg-emerald-800/10" />
      <Skeleton className="mt-3 h-8 w-56 bg-slate-200" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-5/6 bg-slate-200" />
      </div>

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20 bg-slate-200" />
          <Skeleton className="h-3 w-4 bg-slate-200" />
        </div>

        <ul className="mt-3 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <AppointmentRowSkeleton key={i} />
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24 bg-slate-200" />
          <Skeleton className="size-4 rounded-full bg-slate-200" />
        </div>

        <ul className="mt-3 space-y-2 overflow-hidden">
          {Array.from({ length: 2 }).map((_, i) => (
            <AppointmentRowSkeleton key={i} muted />
          ))}
        </ul>
      </section>
    </div>
  )
}
