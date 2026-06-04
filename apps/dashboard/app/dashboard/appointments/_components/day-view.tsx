import { useAppointmentsByDate } from "@/lib/queries/appointments"
import { useState } from "react"
import { AppointmentsDaySkeleton } from "./AppointmentsSkeleton"
import { ErrorState } from "./states"
import { cn } from "@careline/ui/lib/utils"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Badge } from "@careline/ui/components/badge"
import { Actions } from "./actions"
import { DeleteSlotDialog } from "./delete-dialog"

import type { AppointmentStatus } from "@careline/shared/prisma/index"
import type { Appointment } from "@careline/shared/types/appointment.type"

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

interface DayViewProps {
  date: Date
}
export const DayView = ({ date }: DayViewProps) => {
  const [expanded, setExpanded] = useState<string | null>("s_3")

  const {
    data: slots,
    isLoading,
    isError,
    refetch,
  } = useAppointmentsByDate(date.toISOString())

  if (isLoading && !slots) return <AppointmentsDaySkeleton />
  if (isError)
    return (
      <ErrorState
        title="Couldn't load appointments"
        description="We couldn't fetch the slots for this day. Check your connection and try again."
        onRetry={() => void refetch()}
      />
    )
  return (
    <ul className="divide-y divide-border/40">
      {slots!.map((slot) => {
        const negativeStatuses = ["NO_SHOW", "CANCELLED"]
        const isOpen = expanded === slot.id
        const filled = slot.bookings.filter(
          (booking: Appointment) => !negativeStatuses.includes(booking.status)
        ).length
        const status: SlotStatus =
          filled === 0 ? "empty" : filled >= slot.capacity ? "full" : "partial"

        return (
          <li
            key={slot.id}
            className={cn("border", isOpen && "border-primary")}
          >
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : slot.id)}
              className={cn(
                "grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 border px-6 py-5 text-left transition-colors",
                !isOpen && "hover:border-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-2.5 rounded-full",
                    status === "empty" && "bg-muted-foreground/40",
                    status === "partial" && "bg-amber-500",
                    status === "full" && "bg-rose-500"
                  )}
                />
                <span className="font-mono text-base font-semibold tabular-nums">
                  {format(slot.time, "p")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filled}
                  <span className="mx-1 text-border">/</span>
                  {slot.capacity}
                </span>
                {slot.bookings.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {slot.bookings.slice(0, 3).map((b) => (
                      <span
                        key={b.id}
                        className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/80"
                      >
                        {b.patientName.split(" ")[0]}
                      </span>
                    ))}
                    {slot.bookings.length > 3 ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        +{slot.bookings.length - 3}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    No bookings
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {status === "empty" ? (
                  <DeleteSlotDialog slotId={slot.id} slotTime={slot.time} />
                ) : null}
                <ChevronDownIcon
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </div>
            </button>

            {isOpen && slot.bookings.length > 0 ? (
              <div className="border-t border-border/40 bg-muted/20 px-6 py-4">
                <ul className="space-y-2.5">
                  {slot.bookings.map((appt) => (
                    <li
                      key={appt.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-medium">{appt.patientName}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full text-xs",
                            STATUS_TONE[appt.status as keyof typeof STATUS_TONE]
                          )}
                        >
                          {appt.status.replace("_", " ").toLowerCase()}
                        </Badge>
                      </span>
                      <div className="space-x-4">
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          booked {format(appt.bookedAt, "MMM dd, p")}
                        </span>

                        <Actions appointmentId={appt.id} status={appt.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
