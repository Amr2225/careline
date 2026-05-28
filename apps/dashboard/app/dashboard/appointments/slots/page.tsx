"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  CalendarDays,
  CalendarPlus,
  CalendarRange,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutTemplate,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Badge } from "@careline/ui/components/badge"
import { Input } from "@careline/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@careline/ui/components/select"
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
import { cn } from "@careline/ui/lib/utils"

type SlotFill = "empty" | "partial" | "full"

type MockSlot = {
  id: string
  startTime: string
  capacity: number
  booked: number
  templateName: string | null
}

const FILL_TONE: Record<SlotFill, string> = {
  empty: "bg-muted text-muted-foreground border-border",
  partial: "bg-amber-50 text-amber-700 border-amber-200",
  full: "bg-rose-50 text-rose-700 border-rose-200",
}

const FILL_DOT: Record<SlotFill, string> = {
  empty: "bg-muted-foreground/40",
  partial: "bg-amber-500",
  full: "bg-rose-500",
}

const FILTER_OPTIONS = [
  { value: "all", label: "All slots" },
  { value: "empty", label: "Empty only" },
  { value: "partial", label: "Partially booked" },
  { value: "full", label: "Full" },
] as const

type FilterValue = (typeof FILTER_OPTIONS)[number]["value"]

const DAY_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function getFill(s: MockSlot): SlotFill {
  if (s.booked === 0) return "empty"
  if (s.booked >= s.capacity) return "full"
  return "partial"
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  return `${DAY_FULL[d.getDay()]}, ${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`
}

function fmtTime(iso: string) {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

function dayKey(iso: string) {
  return iso.slice(0, 10)
}

export default function SlotsPage() {
  // GET /api/v1/slots?from=YYYY-MM-DD&to=YYYY-MM-DD
  const mockSlots: MockSlot[] = [
    { id: "s_1", startTime: "2026-05-25T09:00:00", capacity: 1, booked: 1, templateName: "Weekday morning clinic" },
    { id: "s_2", startTime: "2026-05-25T09:30:00", capacity: 1, booked: 0, templateName: "Weekday morning clinic" },
    { id: "s_3", startTime: "2026-05-25T10:00:00", capacity: 2, booked: 2, templateName: "Weekday morning clinic" },
    { id: "s_4", startTime: "2026-05-25T10:30:00", capacity: 2, booked: 1, templateName: "Weekday morning clinic" },
    { id: "s_5", startTime: "2026-05-25T11:00:00", capacity: 2, booked: 0, templateName: "Weekday morning clinic" },
    { id: "s_6", startTime: "2026-05-25T13:00:00", capacity: 1, booked: 0, templateName: null },
    { id: "s_7", startTime: "2026-05-26T10:00:00", capacity: 2, booked: 1, templateName: "Wednesday triage" },
    { id: "s_8", startTime: "2026-05-26T10:30:00", capacity: 2, booked: 0, templateName: "Wednesday triage" },
    { id: "s_9", startTime: "2026-05-26T11:00:00", capacity: 2, booked: 2, templateName: "Wednesday triage" },
    { id: "s_10", startTime: "2026-05-27T09:00:00", capacity: 1, booked: 1, templateName: "Weekday morning clinic" },
    { id: "s_11", startTime: "2026-05-27T09:30:00", capacity: 1, booked: 0, templateName: "Weekday morning clinic" },
  ]

  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterValue>("all")

  const filteredSlots = useMemo(() => {
    return mockSlots.filter((s) => {
      const fill = getFill(s)
      if (filter !== "all" && fill !== filter) return false
      if (query) {
        const q = query.toLowerCase()
        const haystack = `${fmtDate(s.startTime)} ${fmtTime(s.startTime)} ${s.templateName ?? ""}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [query, filter])

  const grouped = useMemo(() => {
    const map = new Map<string, MockSlot[]>()
    for (const s of filteredSlots) {
      const key = dayKey(s.startTime)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(s)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filteredSlots])

  const stats = useMemo(() => {
    const total = mockSlots.length
    let empty = 0
    let partial = 0
    let full = 0
    let fromTemplate = 0
    for (const s of mockSlots) {
      const f = getFill(s)
      if (f === "empty") empty++
      else if (f === "partial") partial++
      else full++
      if (s.templateName) fromTemplate++
    }
    return { total, empty, partial, full, fromTemplate }
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard/appointments">
            <ChevronLeft className="size-4" />
            Back to appointments
          </Link>
        </Button>
        <header className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CalendarRange className="size-5" />
            </span>
            <div className="space-y-1.5">
              <h1 className="text-3xl font-bold tracking-tight">All slots</h1>
              <p className="max-w-xl text-sm text-muted-foreground">
                Every generated slot across upcoming days. Filter by fill state,
                search, or delete empty slots to clean up.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
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
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total slots" value={stats.total} accent="primary" icon={<Clock className="size-4" />} />
        <StatCard label="Empty" value={stats.empty} accent="muted" icon={<CalendarDays className="size-4" />} />
        <StatCard label="Full" value={stats.full} accent="muted" icon={<Users className="size-4" />} />
        <StatCard label="From templates" value={stats.fromTemplate} accent="muted" icon={<Sparkles className="size-4" />} />
      </section>

      <section className="shadow-ambient overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search date, time, template..."
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={(v) => setFilter(v as FilterValue)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FILTER_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              <span className="font-mono font-medium text-foreground tabular-nums">
                {filteredSlots.length}
              </span>{" "}
              of <span className="font-mono tabular-nums">{stats.total}</span>
            </span>
          </div>
        </div>

        {grouped.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CalendarRange className="size-5" />
            </span>
            <div className="space-y-1">
              <p className="font-semibold">No slots match</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Try clearing the filters or create more slots.
              </p>
            </div>
            <Button variant="outline" onClick={() => { setQuery(""); setFilter("all") }}>
              Clear filters
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border/40">
            {grouped.map(([key, slots]) => {
              const filledOnDay = slots.reduce((acc, s) => acc + s.booked, 0)
              const capacityOnDay = slots.reduce((acc, s) => acc + s.capacity, 0)
              return (
                <li key={key} className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="text-[10px] font-semibold tracking-wider uppercase opacity-70">
                          {MONTH_SHORT[new Date(key).getMonth()]}
                        </span>
                        <span className="font-mono text-sm font-bold leading-none tabular-nums">
                          {new Date(key).getDate()}
                        </span>
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{fmtDate(key + "T00:00:00")}</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-mono tabular-nums">{slots.length}</span> slots ·{" "}
                          <span className="font-mono tabular-nums">{filledOnDay}</span>/
                          <span className="font-mono tabular-nums">{capacityOnDay}</span> booked
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard/appointments">
                        Day view
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {slots.map((s) => (
                      <SlotChip key={s.id} slot={s} />
                    ))}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}

function SlotChip({ slot }: { slot: MockSlot }) {
  const fill = getFill(slot)
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/30",
        fill === "empty" && "border-border/60",
        fill === "partial" && "border-amber-200/70",
        fill === "full" && "border-rose-200/70"
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("size-2 shrink-0 rounded-full", FILL_DOT[fill])} />
        <div>
          <p className="font-mono text-base font-semibold tabular-nums leading-tight">
            {fmtTime(slot.startTime)}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge variant="outline" className={cn("rounded-full px-1.5 py-0 text-[10px]", FILL_TONE[fill])}>
              {slot.booked}/{slot.capacity}
            </Badge>
            {slot.templateName ? (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Sparkles className="size-2.5" />
                {slot.templateName.length > 16 ? slot.templateName.slice(0, 14) + "…" : slot.templateName}
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground italic">manual</span>
            )}
          </div>
        </div>
      </div>

      {fill === "empty" ? (
        <DeleteSlotDialog slotId={slot.id} slotTime={fmtTime(slot.startTime)} />
      ) : fill === "full" ? (
        <CheckCircle2 className="size-4 shrink-0 text-rose-500/70" aria-label="Full" />
      ) : null}
    </div>
  )
}

function DeleteSlotDialog({ slotId, slotTime }: { slotId: string; slotTime: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
          aria-label="Delete empty slot"
        >
          <Trash2 className="size-3.5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
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
        accent === "primary" ? "border-primary/20 bg-primary/4" : "border-border/60 bg-card"
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
          accent === "primary" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </span>
    </div>
  )
}
