"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  Clock,
  Coffee,
  Info,
  Sparkles,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Label } from "@careline/ui/components/label"
import { Calendar } from "@careline/ui/components/calendar"
import { Switch } from "@careline/ui/components/switch"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@careline/ui/components/popover"
import { cn } from "@careline/ui/lib/utils"
import { useSettings } from "@/lib/queries/settings"
import { useCreateBulkSlots } from "@/lib/queries/slots"
import { toast } from "sonner"
import { ErrorState, FormPageSkeleton } from "../../_components/states"

const WEEKDAYS = [
  { value: 0, short: "Sun", long: "Sunday" },
  { value: 1, short: "Mon", long: "Monday" },
  { value: 2, short: "Tue", long: "Tuesday" },
  { value: 3, short: "Wed", long: "Wednesday" },
  { value: 4, short: "Thu", long: "Thursday" },
  { value: 5, short: "Fri", long: "Friday" },
  { value: 6, short: "Sat", long: "Saturday" },
]
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function fmtDate(d: Date) {
  return `${DAY_SHORT[d.getDay()]}, ${MONTH_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function differenceInCalendarDays(end: Date, start: Date) {
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  return Math.round((e.getTime() - s.getTime()) / 86_400_000) // 86_400_000 = 1 day in milliseconds
}

function parseHM(hm: string): [number, number] {
  const [h, m] = hm.split(":").map(Number)
  return [h ?? 0, m ?? 0]
}
export default function NewSlotsPage() {
  const router = useRouter()
  const { data: settings, isLoading, isError, refetch } = useSettings()
  const { mutateAsync: createBulkSlots, isPending } = useCreateBulkSlots()

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(
    new Date(Date.now() + 6 * 86400_000)
  )
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4])
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [lunchEnabled, setLunchEnabled] = useState(true)
  const [lunchStart, setLunchStart] = useState("12:00")
  const [lunchEnd, setLunchEnd] = useState("13:00")

  const previewCount = useMemo(() => {
    if (!settings) return 0

    const dayCount = Math.max(
      0,
      differenceInCalendarDays(endDate, startDate) + 1
    )
    if (!dayCount || days.length === 0) return 0

    let matchingDays = 0
    for (let i = 0; i < dayCount; i++) {
      const d = new Date(startDate)
      d.setDate(d.getDate() + i)
      if (days.includes(d.getDay())) matchingDays++
    }

    const [startTimeHour, startTimeMinute] = parseHM(startTime)
    const [endTimeHour, endTimeMinute] = parseHM(endTime)
    const totalMinutes =
      endTimeHour * 60 + endTimeMinute - (startTimeHour * 60 + startTimeMinute)

    let usable = totalMinutes
    if (lunchEnabled) {
      const [lucnhStartHour, lunchStartMinute] = parseHM(lunchStart)
      const [lunchEndHour, lunchEndMinute] = parseHM(lunchEnd)
      usable -=
        lunchEndHour * 60 +
        lunchEndMinute -
        (lucnhStartHour * 60 + lunchStartMinute)
    }
    const perDay = Math.max(
      0,
      Math.floor(usable / parseInt(settings?.appointmentDurationMinutes ?? 0))
    )
    return matchingDays * perDay
  }, [
    startDate,
    endDate,
    days,
    startTime,
    endTime,
    lunchEnabled,
    lunchStart,
    lunchEnd,
    settings,
  ])

  const toggleDay = (d: number) =>
    setDays((prev) =>
      prev.includes(d) ? prev.filter((v) => v !== d) : [...prev, d].sort()
    )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // POST /api/v1/slots/bulk
    // body: { startDate, endDate, daysOfWeek: days, startTime, endTime, lunchStart, lunchEnd }
    try {
      await createBulkSlots({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        daysOfWeek: days,
        startTime,
        endTime,
        lunchStartTime: lunchEnabled ? lunchStart : undefined,
        lunchEndTime: lunchEnabled ? lunchEnd : undefined,
      })

      toast.success("Slots created successfully")
      router.push("/dashboard/appointments")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create slots")
    }
  }

  if (isLoading && !settings)
    return <FormPageSkeleton sections={3} className="max-w-3xl" />
  if (isError)
    return (
      <ErrorState
        className="mx-auto max-w-3xl"
        title="Couldn't load clinic settings"
        description="Slot generation needs your clinic hours and capacity. Check your connection and try again."
        onRetry={() => void refetch()}
      />
    )

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard/appointments">
            <ChevronLeft className="size-4" />
            Back to appointments
          </Link>
        </Button>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Create slots</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Generate slots in bulk across a date range. Times outside clinic hours
          and days marked closed are skipped automatically.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Date range</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick the window and which weekdays to populate.
            </p>
          </header>
          <div className="grid gap-5 sm:grid-cols-2">
            <DateField
              label="Start date"
              value={startDate}
              onChange={setStartDate}
            />
            <DateField
              label="End date"
              value={endDate}
              onChange={setEndDate}
              min={startDate}
            />
          </div>

          <div className="space-y-2">
            <Label>Days of the week</Label>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => {
                const active = days.includes(d.value)
                const closed = !settings?.clinicHours[String(d.value)]
                return (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => !closed && toggleDay(d.value)}
                    disabled={closed}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      closed && "cursor-not-allowed line-through opacity-40"
                    )}
                    title={closed ? "Clinic is closed on this day" : undefined}
                  >
                    {d.short}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Crossed-out days are marked closed in clinic settings.
            </p>
          </div>
        </section>

        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Hours</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The clinic's open window for each selected day.
            </p>
          </header>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/30 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Coffee className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">Lunch break</p>
                  <p className="text-xs text-muted-foreground">
                    No slots created during this window.
                  </p>
                </div>
              </div>
              <Switch
                checked={lunchEnabled}
                onCheckedChange={setLunchEnabled}
              />
            </div>
            {lunchEnabled ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lunch-start">Lunch start</Label>
                  <Input
                    id="lunch-start"
                    type="time"
                    value={lunchStart}
                    onChange={(e) => setLunchStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunch-end">Lunch end</Label>
                  <Input
                    id="lunch-end"
                    type="time"
                    value={lunchEnd}
                    onChange={(e) => setLunchEnd(e.target.value)}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="shadow-ambient rounded-2xl border border-primary/30 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <div className="flex-1 space-y-1">
              <p className="text-label-md text-primary/70">Preview</p>
              <p className="font-mono text-3xl font-bold tabular-nums">
                {previewCount}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  slots will be created
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Using {settings?.appointmentDurationMinutes}-min duration and
                capacity {settings?.slotCapacity} per slot (from clinic
                settings).
              </p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" asChild>
            <Link href="/dashboard/appointments">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending || previewCount === 0}>
            <CalendarPlus className="size-4" />
            {isPending ? "Creating..." : `Create ${previewCount} slots`}
          </Button>
        </div>

        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="size-3.5 shrink-0" />
          Re-running with overlapping dates is safe — existing slots are
          skipped.
        </p>
      </form>
    </div>
  )
}

function DateField({
  label,
  value,
  onChange,
  min,
}: {
  label: string
  value: Date
  onChange: (d: Date) => void
  min?: Date
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              {fmtDate(value)}
            </span>
            <ChevronDown className="size-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            required
            selected={value}
            onSelect={onChange}
            defaultMonth={value}
            disabled={min ? { before: min } : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
