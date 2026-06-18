"use client"
import { useMemo, useState } from "react"
import Link from "next/link"
import {
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  CalendarRange,
  Clock,
  LayoutTemplate,
  MoreHorizontal,
  Plus,
  Users,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@careline/ui/components/dropdown-menu"
import { cn } from "@careline/ui/lib/utils"
import { useAppointmentsByDate } from "@/lib/queries/appointments"
import { DateFilter } from "./_components/dateFilter"
import { AppointmentsDaySkeleton } from "./_components/AppointmentsSkeleton"
import { ErrorState } from "./_components/states"
import { parseAsIsoDate, useQueryState } from "nuqs"
import { WeekView } from "./_components/week-view"
import { DayView } from "./_components/day-view"

export default function AppointmentsDayPage() {
  const [date, setDate] = useQueryState<Date>(
    "date",
    parseAsIsoDate.withDefault(new Date())
  )
  const [view, setView] = useState<"day" | "week">("day")

  const {
    data: slots,
    isLoading,
    isError,
    refetch,
  } = useAppointmentsByDate(date.toISOString())

  const stats = useMemo(() => {
    if (slots) {
      const total = slots.length
      const booked = slots.reduce((acc, s) => acc + s.bookedCount, 0)
      const totalCapacity = slots.reduce((acc, s) => acc + s.capacity, 0)
      const empty = slots.filter((s) => s.bookings.length === 0).length
      return { total, booked, totalCapacity, empty }
    }

    return { total: 0, booked: 0, totalCapacity: 0, empty: 0 }
  }, [slots])

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
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Appointments
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Day view of every slot and its bookings. Create more slots in bulk
            or set up a recurring weekly template.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/appointments/slots/new">
              <CalendarPlus className="size-4" />
              Create slots
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="More slot options"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/appointments/slots">
                  <CalendarRange className="size-4" />
                  All slots
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/appointments/templates">
                  <LayoutTemplate className="size-4" />
                  Templates
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/appointments/slots/single">
                  <Plus className="size-4" />
                  Add single slot
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Slots today"
          value={stats.total}
          accent="primary"
          icon={<Clock className="size-4" />}
        />
        <StatCard
          label="Bookings"
          value={stats.booked}
          accent="primary"
          icon={<Users className="size-4" />}
        />
        <StatCard
          label="Total capacity"
          value={stats.totalCapacity}
          accent="muted"
          icon={<CalendarDays className="size-4" />}
        />
        <StatCard
          label="Empty slots"
          value={stats.empty}
          accent="muted"
          icon={<CalendarClock className="size-4" />}
        />
      </section>

      <section className="shadow-ambient overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div className="flex flex-col gap-4 border-b border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Date Filters */}
          <DateFilter date={date} setDate={setDate} view={view} />

          <div className="flex items-center gap-3">
            <ViewToggle value={view} onChange={setView} />
            <div className="hidden text-xs text-muted-foreground sm:block">
              <span className="font-mono font-medium text-foreground tabular-nums">
                {stats.total}
              </span>{" "}
              slots
            </div>
          </div>
        </div>

        {view === "week" ? (
          <WeekView
            weekStart={date}
            onPickDay={(d) => {
              setDate(d)
              setView("day")
            }}
          />
        ) : (
          <DayView date={date} />
        )}
      </section>
    </div>
  )
}

function ViewToggle({
  value,
  onChange,
}: {
  value: "day" | "week"
  onChange: (v: "day" | "week") => void
}) {
  return (
    <div className="relative flex items-center rounded-full border border-border/70 bg-muted/40 p-0.5 text-xs">
      {(["day", "week"] as const).map((key) => {
        const active = value === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-3.5 py-1.5 font-semibold capitalize transition-colors",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}

function StatCard({
  label,
  value,
  accent,
  icon,
}: {
  label: string
  value: number
  accent: "primary" | "muted"
  icon: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "shadow-ambient flex items-start justify-between rounded-2xl border p-5",
        accent === "primary"
          ? "border-primary/20 bg-primary/4"
          : "border-border/60 bg-card"
      )}
    >
      <div>
        <p className="text-label-md text-muted-foreground">{label}</p>
        <p className="mt-2 font-mono text-3xl font-bold tracking-tight tabular-nums">
          {value}
        </p>
      </div>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          accent === "primary"
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </span>
    </div>
  )
}
