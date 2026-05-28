import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Users,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@careline/ui/components/dialog"
import NextAvailablePanel from "./next-available.js"

type MockSlot = {
  id: string
  time: string
  remaining: number
  capacity: number
  projectedPosition: number
}

const WEEK_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function formatDate(d: Date) {
  return `${WEEK_NAMES[d.getDay()]}, ${d.toLocaleString("en-US", { month: "short", day: "numeric" })}`
}

function addDays(d: Date, n: number) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

type SubView = "browse" | "next"

export default function BookingPage() {
  const [view, setView] = useState<SubView>("browse")

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_24px_rgba(6,95,70,0.25)]">
          <CalendarPlus className="size-6" />
        </span>
        <SegmentSwitcher value={view} onChange={setView} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mt-6 flex flex-1 flex-col"
        >
          {view === "browse" ? (
            <BrowseSlots onSeeNextAvailable={() => setView("next")} />
          ) : (
            <NextAvailablePanel onSwitchToBrowse={() => setView("browse")} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SegmentSwitcher({
  value,
  onChange,
}: {
  value: SubView
  onChange: (v: SubView) => void
}) {
  return (
    <div className="relative flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs">
      {(["browse", "next"] as const).map((key) => {
        const active = value === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className="relative z-10 rounded-full px-3 py-1.5 font-semibold transition-colors"
          >
            {active ? (
              <motion.span
                layoutId="book-segment"
                className="absolute inset-0 rounded-full bg-emerald-800 shadow-sm"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            ) : null}
            <span
              className={
                active ? "relative text-white" : "relative text-slate-500"
              }
            >
              {key === "browse" ? "Browse" : "Next open"}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function BrowseSlots({
  onSeeNextAvailable,
}: {
  onSeeNextAvailable: () => void
}) {
  const tomorrow = addDays(new Date(), 1)
  const [selectedDate, setSelectedDate] = useState<Date>(tomorrow)
  const [confirmSlot, setConfirmSlot] = useState<MockSlot | null>(null)
  const [booking, setBooking] = useState(false)
  const [bookedId, setBookedId] = useState<string | null>(null)

  // GET /api/v1/slots/available?date=YYYY-MM-DD
  const slots: MockSlot[] = useMemo(
    () => [
      {
        id: "s_1",
        time: "09:00",
        remaining: 1,
        capacity: 1,
        projectedPosition: 1,
      },
      {
        id: "s_2",
        time: "09:30",
        remaining: 0,
        capacity: 1,
        projectedPosition: 0,
      },
      {
        id: "s_3",
        time: "10:00",
        remaining: 2,
        capacity: 2,
        projectedPosition: 3,
      },
      {
        id: "s_4",
        time: "10:30",
        remaining: 1,
        capacity: 2,
        projectedPosition: 5,
      },
      {
        id: "s_5",
        time: "11:00",
        remaining: 2,
        capacity: 2,
        projectedPosition: 6,
      },
      {
        id: "s_6",
        time: "11:30",
        remaining: 1,
        capacity: 1,
        projectedPosition: 8,
      },
      {
        id: "s_7",
        time: "13:00",
        remaining: 1,
        capacity: 1,
        projectedPosition: 9,
      },
      {
        id: "s_8",
        time: "13:30",
        remaining: 1,
        capacity: 1,
        projectedPosition: 10,
      },
      {
        id: "s_9",
        time: "14:00",
        remaining: 1,
        capacity: 1,
        projectedPosition: 11,
      },
      {
        id: "s_10",
        time: "14:30",
        remaining: 1,
        capacity: 1,
        projectedPosition: 12,
      },
    ],
    []
  )

  const availableSlots = slots.filter((s) => s.remaining > 0)

  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date(tomorrow)
    d.setDate(1)
    return d
  })

  const today = useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const daysInMonth = useMemo(() => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const count = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: count }, (_, i) => new Date(year, month, i + 1))
  }, [viewMonth])

  // First column = Sunday. Pad with placeholders so day 1 lands under its weekday.
  const leadingBlanks = daysInMonth[0]?.getDay() ?? 0

  const sameMonth =
    selectedDate.getFullYear() === viewMonth.getFullYear() &&
    selectedDate.getMonth() === viewMonth.getMonth()

  const handleBook = () => {
    if (!confirmSlot) return
    setBooking(true)
    // POST /api/v1/appointments  { slotId: confirmSlot.id }
    console.log("book slot", confirmSlot.id)
    setTimeout(() => {
      setBooking(false)
      setBookedId(confirmSlot.id)
      setConfirmSlot(null)
    }, 700)
  }

  return (
    <>
      <p className="text-sm font-semibold tracking-[0.2em] text-emerald-800/60 uppercase">
        Book a visit
      </p>
      <h2 className="mt-2 text-2xl font-bold">Pick a time</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Browse open slots for the next two weeks and tap one to book.
      </p>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white"
            onClick={() => {
              const d = new Date(viewMonth)
              d.setMonth(d.getMonth() - 1)
              setViewMonth(d)
            }}
            aria-label="Previous month"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2 text-base font-bold text-slate-900">
            <CalendarDays className="size-4 text-emerald-800" />
            {viewMonth.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white"
            onClick={() => {
              const d = new Date(viewMonth)
              d.setMonth(d.getMonth() + 1)
              setViewMonth(d)
            }}
            aria-label="Next month"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 px-1">
          {WEEK_NAMES.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase"
            >
              {name.slice(0, 2)}
            </div>
          ))}

          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} aria-hidden />
          ))}

          {daysInMonth.map((d) => {
            const isPast = d < today
            const isToday = d.getTime() === today.getTime()
            const isSelected =
              sameMonth && selectedDate.getDate() === d.getDate()
            return (
              <button
                key={d.getDate()}
                type="button"
                onClick={() => !isPast && setSelectedDate(d)}
                disabled={isPast}
                aria-label={d.toDateString()}
                aria-pressed={isSelected}
                className={`relative flex aspect-square items-center justify-center rounded-xl text-base font-semibold tabular-nums transition-all ${
                  isSelected
                    ? "bg-emerald-800 text-white shadow-[0_8px_18px_rgba(6,95,70,0.28)]"
                    : isPast
                      ? "text-slate-300"
                      : isToday
                        ? "bg-white text-emerald-800 ring-1 ring-emerald-800/30"
                        : "text-slate-700 hover:bg-white"
                }`}
              >
                {d.getDate()}
                {isToday && !isSelected ? (
                  <span className="absolute bottom-1.5 size-1 rounded-full bg-emerald-800" />
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-200/70 px-1 pt-3">
          <span className="text-[11px] text-slate-500">Selected</span>
          <span className="text-sm font-semibold text-emerald-800">
            {formatDate(selectedDate)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
          {availableSlots.length} open slots
        </p>
        <button
          type="button"
          onClick={onSeeNextAvailable}
          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800"
        >
          <Sparkles className="size-3" />
          Next available
        </button>
      </div>

      {availableSlots.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Clock className="size-5" />
          </span>
          <p className="mt-3 text-sm font-semibold">All booked up</p>
          <p className="mt-1 text-xs text-slate-500">
            No open slots on this day. Try another date.
          </p>
        </div>
      ) : (
        <ul className="mt-3 space-y-2">
          <AnimatePresence initial={false}>
            {availableSlots.map((slot, i) => {
              const justBooked = bookedId === slot.id
              return (
                <motion.li
                  key={slot.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setConfirmSlot(slot)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      justBooked
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-100 bg-white hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(6,95,70,0.08)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl ${
                          justBooked
                            ? "bg-emerald-800 text-white"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {justBooked ? (
                          <CheckCircle2 className="size-5" />
                        ) : (
                          <Clock className="size-5" />
                        )}
                      </span>
                      <div>
                        <p className="font-mono text-base leading-tight font-bold tabular-nums">
                          {slot.time}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {slot.remaining} of {slot.capacity} open · #
                          {slot.projectedPosition} projected
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-slate-400" />
                  </motion.button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}

      <Dialog
        open={!!confirmSlot}
        onOpenChange={(open) => !open && setConfirmSlot(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm your booking</DialogTitle>
            <DialogDescription>
              {confirmSlot ? (
                <>
                  {formatDate(selectedDate)} at{" "}
                  <strong className="font-mono">{confirmSlot.time}</strong>
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>

          {confirmSlot ? (
            <div className="rounded-2xl border border-emerald-800/15 bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-800 text-white">
                  <Users className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-emerald-800/70 uppercase">
                    Projected position
                  </p>
                  <p className="font-mono text-2xl font-bold text-emerald-900 tabular-nums">
                    #{confirmSlot.projectedPosition}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-emerald-900/70">
                This is where you'll be when the day starts. Your actual queue
                position locks in when you scan the QR on arrival.
              </p>
            </div>
          ) : null}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmSlot(null)}>
              Cancel
            </Button>
            <Button onClick={handleBook} disabled={booking}>
              <CheckCircle2 className="size-4" />
              {booking ? "Booking..." : "Confirm booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
