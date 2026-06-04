import { useAppointmentsByDateRange } from "@/lib/queries/appointments"
import { addDays, format, isSameDay } from "date-fns"
import { WeekViewSkeleton } from "./AppointmentsSkeleton"
import { ErrorState } from "./states"
import { cn } from "@careline/ui/lib/utils"
import {
  Appointment,
  AppointmentStatus,
  SlotAndAppointments,
} from "@careline/shared/types/appointment.type"
import { useState } from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@careline/ui/components/hover-card"
import { UsersIcon } from "lucide-react"
import { Badge } from "@careline/ui/components/badge"
import { Actions } from "./actions"

type SlotStatus = "empty" | "partial" | "full"
const STATUS_TONE: Record<keyof typeof AppointmentStatus, string> = {
  BOOKED: "bg-sky-50 text-sky-700 border-sky-200",
  ARRIVED: "bg-amber-50 text-amber-700 border-amber-200",
  IN_PROGRESS: "bg-violet-50 text-violet-700 border-violet-200",
  DONE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  NO_SHOW: "bg-rose-50 text-rose-700 border-rose-200",
  CANCELLED: "bg-gray-50 text-gray-500 border-gray-200",
  LATE_ARRIVING: "bg-yellow-50 text-yellow-600 border-yellow-200",
}

export function WeekView({
  weekStart,
  onPickDay,
}: {
  weekStart: Date
  onPickDay: (d: Date) => void
}) {
  const {
    data: days,
    isLoading,
    isError,
    refetch,
  } = useAppointmentsByDateRange(
    new Date(weekStart).toISOString(),
    new Date(addDays(weekStart, 6)).toISOString()
  )

  const today = new Date()
  if (isLoading && !days) return <WeekViewSkeleton />
  if (isError)
    return (
      <ErrorState
        className="border-0 bg-transparent shadow-none"
        title="Couldn't load this week"
        description="We couldn't fetch the slots for this week. Check your connection and try again."
        onRetry={() => void refetch()}
      />
    )

  return (
    <div className="grid grid-cols-2 divide-y divide-border/40 sm:grid-cols-4 sm:divide-x sm:divide-y-0 lg:grid-cols-7">
      {days &&
        days.map((day) => {
          const isToday = isSameDay(day.date, today)
          const dayBooked = day.slots.reduce(
            (acc, slot) => acc + slot.bookedCount,
            0
          )
          const dayCap = day.slots.reduce((acc, s) => acc + s.capacity, 0)
          const isClosed = day.slots.length === 0

          return (
            <div
              key={day.date}
              className={cn(
                "flex min-h-[280px] flex-col border-border/40 sm:border-t-0",
                "sm:nth-[n+5]:border-t lg:nth-[n+5]:border-t-0"
              )}
            >
              <button
                type="button"
                onClick={() => onPickDay(new Date(day.date))}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 border-b border-border/40 px-3 py-2.5 text-left transition-colors hover:bg-primary/6",
                  isToday && "bg-primary/5"
                )}
              >
                <div>
                  <p
                    className={cn(
                      "text-[10px] font-bold tracking-wider uppercase",
                      isToday ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {format(day.date, "EEE")}
                  </p>
                  <p
                    className={cn(
                      "font-mono text-lg leading-none font-bold tabular-nums",
                      isToday ? "text-primary" : "text-foreground"
                    )}
                  >
                    {format(day.date, "d")}
                  </p>
                </div>
                {!isClosed ? (
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                    <p className="font-mono text-[10px] text-muted-foreground tabular-nums">
                      Booked
                    </p>
                    {dayBooked}/{dayCap}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Closed
                  </span>
                )}
              </button>

              <div className="flex-1 space-y-1 p-2">
                {isClosed ? (
                  <div className="flex h-full items-center justify-center pt-8">
                    <span className="text-[10px] text-muted-foreground italic">
                      No slots
                    </span>
                  </div>
                ) : (
                  day.slots.map((s) => {
                    const negativeStatuses = ["NO_SHOW", "CANCELLED"]
                    const filled = s.bookings.filter(
                      (booking: Appointment) =>
                        !negativeStatuses.includes(booking.status)
                    ).length

                    const status: SlotStatus =
                      filled === 0
                        ? "empty"
                        : filled >= s.capacity
                          ? "full"
                          : "partial"

                    return (
                      <SlotHoverTile
                        key={s.id}
                        slot={s}
                        filled={filled}
                        status={status}
                        date={day.date}
                      />
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export function SlotHoverTile({
  slot,
  filled,
  status,
  date,
}: {
  slot: SlotAndAppointments
  filled: number
  status: SlotStatus
  date: string
}) {
  const [isHoverOpen, setIsHoverOpen] = useState(false)
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)

  return (
    <HoverCard
      open={isHoverOpen || isActionMenuOpen}
      onOpenChange={setIsHoverOpen}
      openDelay={120}
      closeDelay={80}
    >
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between gap-1.5 rounded-md border px-2 py-1.5 text-xs transition-all hover:shadow-sm",
            status === "empty" &&
              "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            status === "partial" &&
              "border-amber-200 bg-amber-50 text-amber-800 hover:border-amber-400",
            status === "full" &&
              "border-rose-200 bg-rose-50 text-rose-800 hover:border-rose-400"
          )}
        >
          <span className="font-mono font-semibold tabular-nums">
            {format(slot.time, "p")}
          </span>
          <span className="font-mono text-[10px] tabular-nums opacity-70">
            {filled}/{slot.capacity}
          </span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="start" className="w-72 p-0">
        <div className="border-b border-border/60 p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {format(date, "EEE · MMM d")}
              </p>
              <p className="font-mono text-lg leading-tight font-bold tabular-nums">
                {format(slot.time, "p")}
              </p>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                status === "empty" && "bg-muted text-muted-foreground",
                status === "partial" && "bg-amber-100 text-amber-800",
                status === "full" && "bg-rose-100 text-rose-800"
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  status === "empty" && "bg-muted-foreground/50",
                  status === "partial" && "bg-amber-500",
                  status === "full" && "bg-rose-500"
                )}
              />
              {filled}/{slot.capacity} booked
            </span>
          </div>
        </div>

        {slot.bookings.length === 0 ? (
          <div className="flex items-start gap-2 p-3">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <UsersIcon className="size-3.5" />
            </span>
            <div>
              <p className="text-xs font-semibold">Slot is open</p>
              <p className="text-[11px] text-muted-foreground">
                No bookings yet. Patients can still book this slot from the PWA.
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-border/40">
            {slot.bookings.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between gap-2 px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                    {b.patientName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="truncate text-xs font-medium">
                    {b.patientName}
                  </span>
                </div>
                <div className="space-x-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 rounded-full text-[10px]",
                      STATUS_TONE[b.status]
                    )}
                  >
                    {b.status.replace("_", " ").toLowerCase()}
                  </Badge>

                  <Actions
                    key={b.id}
                    status={b.status}
                    appointmentId={b.id}
                    onOpenChange={setIsActionMenuOpen}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
