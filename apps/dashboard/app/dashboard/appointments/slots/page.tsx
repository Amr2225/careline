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
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Badge } from "@careline/ui/components/badge"
import { Input } from "@careline/ui/components/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@careline/ui/components/dropdown-menu"
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
import { addDays, format } from "date-fns"
import { DateFilter } from "../_components/dateFilter"
import { ErrorState } from "../_components/states"
import { SlotsListSkeleton } from "./_components/SlotsListSkeleton"
import { useDeleteSlot } from "@/lib/queries/slots"
import { useSlots } from "@/lib/queries/slots"
import { SlotWithTemplateName } from "@careline/shared/types/slots.type"
import { parseAsIsoDate, useQueryState } from "nuqs"

type SlotFill = "empty" | "partial" | "full"

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

function getFill(bookedCount: number, capacity: number): SlotFill {
  if (bookedCount === 0) return "empty"
  if (bookedCount >= capacity) return "full"
  return "partial"
}

export default function SlotsPage() {
  // GET /api/v1/slots?from=YYYY-MM-DD&to=YYYY-MM-DD
  const [date, setDate] = useQueryState<Date>(
    "date",
    parseAsIsoDate.withDefault(new Date())
  )
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterValue>("all")

  const {
    data: slots,
    isLoading,
    isError,
    refetch,
  } = useSlots(date.toISOString(), addDays(date, 6).toISOString())

  const filteredSlots = useMemo(() => {
    if (!slots) return []

    return slots.filter((s) => {
      const fill = getFill(s.bookedCount, s.capacity)
      if (filter !== "all" && fill !== filter) return false

      if (query) {
        const q = query.toLowerCase()
        const haystack =
          `${format(s.startTime, "EEEE, MMM dd")} ${format(s.startTime, "p")} ${s.template?.name ?? "manual"}`.toLowerCase()

        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [query, filter, slots])

  const grouped = useMemo(() => {
    const map = new Map<string, SlotWithTemplateName[]>()

    for (const slot of filteredSlots) {
      const key = format(slot.startTime, "yyyy-MM-dd")

      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(slot)
    }

    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)) // Order the Array ascending by date
  }, [filteredSlots])

  const stats = useMemo(() => {
    if (!slots)
      return { total: 0, empty: 0, partial: 0, full: 0, fromTemplate: 0 }

    const total = slots.length
    let empty = 0
    let partial = 0
    let full = 0
    let fromTemplate = 0

    for (const slot of slots) {
      const fill = getFill(slot.bookedCount, slot.capacity)
      if (fill === "empty") empty++
      else if (fill === "partial") partial++
      else full++

      if (slot.template?.name) fromTemplate++
    }
    return { total, empty, partial, full, fromTemplate }
  }, [slots])

  if (isLoading && !slots) return <SlotsListSkeleton />
  if (isError)
    return (
      <ErrorState
        title="Couldn't load slots"
        description="We couldn't fetch your slots. Check your connection and try again."
        onRetry={() => void refetch()}
      />
    )

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
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total slots"
          value={stats.total}
          accent="primary"
          icon={<Clock className="size-4" />}
        />
        <StatCard
          label="Empty"
          value={stats.empty}
          accent="muted"
          icon={<CalendarDays className="size-4" />}
        />
        <StatCard
          label="Full"
          value={stats.full}
          accent="muted"
          icon={<Users className="size-4" />}
        />
        <StatCard
          label="From templates"
          value={stats.fromTemplate}
          accent="muted"
          icon={<Sparkles className="size-4" />}
        />
      </section>

      <section className="shadow-ambient overflow-hidden rounded-2xl border border-border/70 bg-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-5 sm:max-w-xs md:max-w-3xl">
            <DateFilter date={date} setDate={setDate} view="week" />
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search date, time, template..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as FilterValue)}
            >
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
            <span className="text-xs whitespace-nowrap text-muted-foreground">
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
            <Button
              variant="outline"
              onClick={() => {
                setQuery("")
                setFilter("all")
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border/40">
            {grouped.map(([date, slots]) => {
              const filledOnDay = slots.reduce(
                (acc, slot) => acc + slot.bookedCount,
                0
              )

              const capacityOnDay = slots.reduce(
                (acc, slot) => acc + slot.capacity,
                0
              )
              return (
                <li key={date} className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="text-[10px] font-semibold tracking-wider uppercase opacity-70">
                          {format(date, "MMM")}
                        </span>
                        <span className="font-mono text-sm leading-none font-bold tabular-nums">
                          {format(date, "d")}
                        </span>
                      </span>
                      <div>
                        <p className="text-sm font-semibold">
                          {format(date, "EEE, MMM d")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-mono tabular-nums">
                            {slots.length}
                          </span>{" "}
                          slots ·{" "}
                          <span className="font-mono tabular-nums">
                            {filledOnDay}
                          </span>
                          /
                          <span className="font-mono tabular-nums">
                            {capacityOnDay}
                          </span>{" "}
                          booked
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        replace
                        href={`/dashboard/appointments?date=${format(date, "yyyy-MM-dd")}`}
                      >
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

function SlotChip({ slot }: { slot: SlotWithTemplateName }) {
  const fill = getFill(slot.bookedCount, slot.capacity)
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
          <p className="font-mono text-base leading-tight font-semibold tabular-nums">
            {format(slot.startTime, "p")}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full px-1.5 py-0 text-[10px]",
                FILL_TONE[fill]
              )}
            >
              {slot.bookedCount}/{slot.capacity}
            </Badge>
            {slot.template?.name ? (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Sparkles className="size-2.5" />
                {slot.template.name.length > 42
                  ? slot.template.name.slice(0, 40) + "…"
                  : slot.template.name}
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground italic">
                manual
              </span>
            )}
          </div>
        </div>
      </div>

      {fill === "empty" ? (
        <DeleteSlotDialog
          slotId={slot.id}
          slotTime={format(slot.startTime, "p")}
        />
      ) : fill === "full" ? (
        <CheckCircle2
          className="size-4 shrink-0 text-rose-500/70"
          aria-label="Full"
        />
      ) : null}
    </div>
  )
}

function DeleteSlotDialog({
  slotId,
  slotTime,
}: {
  slotId: string
  slotTime: string
}) {
  const { mutate: deleteSlot, isPending } = useDeleteSlot(slotId)
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
          <AlertDialogAction
            onClick={() => deleteSlot()}
            disabled={isPending}
            className="bg-rose-600 hover:bg-rose-700"
          >
            {isPending ? "Deleting..." : "Delete"}
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
