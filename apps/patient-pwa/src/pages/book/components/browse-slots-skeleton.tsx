import { Skeleton } from "@careline/ui/components/skeleton"

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export function BrowseSlotsSkeleton() {
  return (
    <>
      <Skeleton className="h-4 w-32 bg-emerald-800/10" />
      <Skeleton className="mt-3 h-8 w-40 bg-slate-200" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-5/6 bg-slate-200" />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
        <div className="flex items-center justify-between px-1">
          <Skeleton className="size-9 rounded-full bg-slate-200" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-full bg-emerald-800/15" />
            <Skeleton className="h-5 w-28 bg-slate-200" />
          </div>
          <Skeleton className="size-9 rounded-full bg-slate-200" />
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 px-1">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center pb-1 text-[10px] font-bold tracking-wider text-slate-300 uppercase"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`aspect-square rounded-xl ${
                i === 10 ? "bg-emerald-800/25" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-200/70 px-1 pt-3">
          <Skeleton className="h-3 w-14 bg-slate-200" />
          <Skeleton className="h-4 w-24 bg-emerald-800/15" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Skeleton className="h-3 w-24 bg-slate-200" />
        <Skeleton className="h-4 w-28 bg-emerald-800/15" />
      </div>

      <ul className="mt-3 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 rounded-xl bg-emerald-50" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-20 bg-slate-200" />
                <Skeleton className="h-3 w-36 bg-slate-200" />
              </div>
            </div>
            <Skeleton className="size-4 rounded-full bg-slate-200" />
          </li>
        ))}
      </ul>
    </>
  )
}
