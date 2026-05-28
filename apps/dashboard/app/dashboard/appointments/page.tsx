"use client"
import { useMemo, useState } from "react"
import Link from "next/link"
import {
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  CalendarRange,
  ChevronDown,
  ChevronRight,
  Clock,
  LayoutTemplate,
  Trash2,
  Users,
} from "lucide-react"
import { format, addDays, isSameDay } from "date-fns"
import { Button } from "@careline/ui/components/button"
import { Badge } from "@careline/ui/components/badge"
import { Calendar } from "@careline/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@careline/ui/components/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@careline/ui/components/alert-dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@careline/ui/components/hover-card"
import { cn } from "@careline/ui/lib/utils"
import {
  useAppointmentsByDate,
  useAppointmentsByDateRange,
} from "@/lib/queries/appointments"
import {
  Appointment,
  AppointmentStatus,
  SlotAndAppointments,
} from "@careline/shared/types/appointment.type"

type SlotStatus = "empty" | "partial" | "full"

const STATUS_TONE: Record<keyof typeof AppointmentStatus, string> = {
  BOOKED: "bg-sky-50 text-sky-700 border-sky-200",
  ARRIVED: "bg-amber-50 text-amber-700 border-amber-200",
  IN_PROGRESS: "bg-violet-50 text-violet-700 border-violet-200",
  DONE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  NO_SHOW: "bg-rose-50 text-rose-700 border-rose-200",
  CANCELLED: "",
  LATE_ARRIVING: "",
}

function fmtWeekRange(start: Date) {
  const end = addDays(start, 6)
  const sameMonth = start.getMonth() === end.getMonth()

  if (sameMonth) return `${format(start, "MMMM d")} - ${format(end, "d, yyyy")}`
  return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`
}
// GET /api/v1/appointments/by-date?date=YYYY-MM-DD
// GET /api/v1/slots/available?date=YYYY-MM-DD
// const mockSlots: MockSlot[] = [
//   {
//     id: "s_1",
//     time: "09:00",
//     capacity: 1,
//     bookings: [
//       {
//         id: "a1",
//         patientName: "Sara Ahmed",
//         status: "DONE",
//         bookedAt: "2026-06-20T08:15:00Z",
//       },
//     ],
//   },
//   {
//     id: "s_2",
//     time: "09:30",
//     capacity: 1,
//     bookings: [
//       {
//         id: "a2",
//         patientName: "Mohamed Hassan",
//         status: "IN_PROGRESS",
//         bookedAt: "2026-05-21T10:02",
//       },
//     ],
//   },
//   {
//     id: "s_3",
//     time: "10:00",
//     capacity: 2,
//     bookings: [
//       {
//         id: "a3",
//         patientName: "Lina Yusuf",
//         status: "ARRIVED",
//         bookedAt: "2026-05-22T14:11",
//       },
//       {
//         id: "a4",
//         patientName: "Omar Tarek",
//         status: "BOOKED",
//         bookedAt: "2026-05-23T09:00",
//       },
//     ],
//   },
//   {
//     id: "s_4",
//     time: "10:30",
//     capacity: 2,
//     bookings: [
//       {
//         id: "a5",
//         patientName: "Mariam Khaled",
//         status: "BOOKED",
//         bookedAt: "2026-05-22T16:45",
//       },
//     ],
//   },
//   { id: "s_5", time: "11:00", capacity: 2, bookings: [] },
//   {
//     id: "s_6",
//     time: "11:30",
//     capacity: 1,
//     bookings: [
//       {
//         id: "a6",
//         patientName: "Karim Adel",
//         status: "BOOKED",
//         bookedAt: "2026-05-23T11:00",
//       },
//     ],
//   },
//   { id: "s_7", time: "13:00", capacity: 1, bookings: [] },
//   { id: "s_8", time: "13:30", capacity: 1, bookings: [] },
//   {
//     id: "s_9",
//     time: "14:00",
//     capacity: 1,
//     bookings: [
//       {
//         id: "a7",
//         patientName: "Nour Hany",
//         status: "NO_SHOW",
//         bookedAt: "2026-05-20T18:30",
//       },
//     ],
//   },
//   { id: "s_10", time: "14:30", capacity: 1, bookings: [] },
// ]

export default function AppointmentsDayPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [expanded, setExpanded] = useState<string | null>("s_3")
  const [view, setView] = useState<"day" | "week">("day")

  const {
    data: mockSlots,
    isLoading,
    isError,
  } = useAppointmentsByDate(date.toISOString())

  const stats = useMemo(() => {
    if (mockSlots) {
      const total = mockSlots.length
      const booked = mockSlots.reduce(
        (acc, s) =>
          acc + s.bookings.filter((b) => b.status !== "NO_SHOW").length,
        0
      )
      const totalCapacity = mockSlots.reduce((acc, s) => acc + s.capacity, 0)
      const empty = mockSlots.filter((s) => s.bookings.length === 0).length
      return { total, booked, totalCapacity, empty }
    }

    return { total: 0, booked: 0, totalCapacity: 0, empty: 0 }
  }, [mockSlots])

  const isToday = isSameDay(date, new Date())

  if (isLoading && !mockSlots) return <div>Loading...</div>
  if (isError) return <div>Error</div>

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
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/appointments/slots">
              <CalendarRange className="size-4" />
              All slots
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/appointments/templates">
              <LayoutTemplate className="size-4" />
              Templates
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/appointments/slots/new">
              <CalendarPlus className="size-4" />
              Create slots
            </Link>
          </Button>
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
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDate(addDays(date, view === "week" ? -7 : -1))}
              aria-label={view === "week" ? "Previous week" : "Previous day"}
            >
              <ChevronRight className="size-4 rotate-180" />
              Prev
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[220px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    {view === "week"
                      ? fmtWeekRange(date)
                      : format(date, "EEEE, MMMM d, yyyy")}
                  </span>
                  <ChevronDown className="size-4 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  required
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                />
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDate(addDays(date, view === "week" ? 7 : 1))}
              aria-label={view === "week" ? "Next week" : "Next day"}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
            {!isToday ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDate(new Date())}
              >
                Today
              </Button>
            ) : null}
          </div>

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
          <ul className="divide-y divide-border/40">
            {mockSlots!.map((slot) => {
              const filled = slot.bookings.filter(
                (b) => b.status !== "NO_SHOW"
              ).length
              const status: SlotStatus =
                filled === 0
                  ? "empty"
                  : filled >= slot.capacity
                    ? "full"
                    : "partial"
              const isOpen = expanded === slot.id

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
                        <DeleteSlotDialog
                          slotId={slot.id}
                          slotTime={slot.time}
                        />
                      ) : null}
                      <ChevronDown
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
                        {slot.bookings.map((b) => (
                          <li
                            key={b.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="flex items-center gap-3">
                              <span className="font-medium">
                                {b.patientName}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "rounded-full text-xs",
                                  STATUS_TONE[
                                    b.status as keyof typeof STATUS_TONE
                                  ]
                                )}
                              >
                                {b.status.replace("_", " ").toLowerCase()}
                              </Badge>
                            </span>
                            <span className="font-mono text-xs text-muted-foreground tabular-nums">
                              booked {format(b.bookedAt, "MMM dd, p")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
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

// type WeekSlot = {
//   id: string
//   time: string
//   capacity: number
//   bookings: Appointment[]
// }

type WeekDayBucket = {
  date: Date
  slots: SlotAndAppointments[]
}

// const POOL: {
//   name: string
//   status: AppointmentStatus
//   bookedAt: string
// }[] = [
//   { name: "Sara Ahmed", status: "BOOKED", bookedAt: "2026-05-22T10:00:00Z" },
//   { name: "Mohamed Hassan", status: "ARRIVED", bookedAt: "2026-05-23T08:30" },
//   { name: "Lina Yusuf", status: "IN_PROGRESS", bookedAt: "2026-05-22T14:11" },
//   { name: "Omar Tarek", status: "BOOKED", bookedAt: "2026-05-23T09:00" },
//   { name: "Mariam Khaled", status: "DONE", bookedAt: "2026-05-21T11:00" },
//   { name: "Karim Adel", status: "BOOKED", bookedAt: "2026-05-23T11:00" },
//   { name: "Nour Hany", status: "NO_SHOW", bookedAt: "2026-05-20T18:30" },
// ]

// function makeBookings(seed: number, count: number): MockBooking[] {
//   return Array.from({ length: count }, (_, i) => {
//     const pick = POOL[(seed + i) % POOL.length]!
//     return {
//       id: `b-${seed}-${i}`,
//       patientName: pick.name,
//       status: pick.status,
//       bookedAt: pick.bookedAt,
//     }
//   })
// }

function WeekView({
  weekStart,
  onPickDay,
}: {
  weekStart: Date
  onPickDay: (d: Date) => void
}) {
  // GET /api/v1/slots/available?from=YYYY-MM-DD&to=YYYY-MM-DD
  // GET /api/v1/appointments/by-date-range
  const days2: WeekDayBucket[] = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(weekStart, i)
    const dow = d.getDay()
    if (dow === 5 || dow === 6) return { date: d, slots: [] }
    const base: SlotAndAppointments[] = [
      {
        id: `${i}-1`,
        time: "09:00",
        capacity: 1,
        bookedCount: 0,
        bookings: [],
      },
      {
        id: `${i}-2`,
        time: "09:30",
        bookedCount: 0,
        capacity: 1,
        bookings: [],
      },
      {
        id: `${i}-3`,
        time: "10:00",
        bookedCount: 0,
        capacity: 2,
        bookings: [],
      },
      {
        id: `${i}-4`,
        time: "10:30",
        bookedCount: 0,
        capacity: 2,
        bookings: [],
      },
      {
        id: `${i}-5`,
        time: "11:00",
        bookedCount: 0,
        capacity: 2,
        bookings: [],
      },
      {
        id: `${i}-6`,
        time: "13:00",
        bookedCount: 0,
        capacity: 1,
        bookings: [],
      },
      {
        id: `${i}-7`,
        time: "13:30",
        bookedCount: 0,
        capacity: 1,
        bookings: [],
      },
      {
        id: `${i}-8`,
        time: "14:00",
        capacity: 1,
        bookedCount: 0,
        bookings: [],
      },
    ]
    return { date: d, slots: base }
  })

  const {
    data: days,
    isLoading,
    isError,
  } = useAppointmentsByDateRange(
    new Date(weekStart).toISOString(),
    new Date(addDays(weekStart, 6)).toISOString()
  )

  const today = new Date()
  console.log("week days: ", days)

  if (isLoading && !days) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div className="grid grid-cols-2 divide-y divide-border/40 sm:grid-cols-4 sm:divide-x sm:divide-y-0 lg:grid-cols-7">
      {days &&
        days.map((day) => {
          const isToday = isSameDay(day.date, today)
          const dayBooked = day.slots.reduce(
            (acc, s) =>
              acc +
              s.bookings.filter(
                (booking: Appointment) => booking.status !== "NO_SHOW"
              ).length,
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
                onClick={() => onPickDay(day.date)}
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
                    const filled = s.bookings.filter(
                      (booking: Appointment) => booking.status !== "NO_SHOW"
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

function SlotHoverTile({
  slot,
  filled,
  status,
  date,
}: {
  slot: SlotAndAppointments
  filled: number
  status: SlotStatus
  date: Date
}) {
  return (
    <HoverCard openDelay={120} closeDelay={80}>
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
              <Users className="size-3.5" />
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
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0 rounded-full text-[10px]",
                    STATUS_TONE[b.status]
                  )}
                >
                  {b.status.replace("_", " ").toLowerCase()}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}

function DeleteSlotDialog({
  slotId,
  slotTime,
}: {
  slotId: string
  slotTime: string
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
          aria-label="Delete empty slot"
        >
          <Trash2 className="size-3.5" />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete empty slot?</AlertDialogTitle>
          <AlertDialogDescription>
            The {slotTime} slot has no bookings. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* DELETE /api/v1/slots/:id */}
          <AlertDialogAction
            onClick={() => console.log("delete slot", slotId)}
            className="bg-rose-600 hover:bg-rose-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
