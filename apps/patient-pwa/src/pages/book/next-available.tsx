import { useState } from "react"
import { motion } from "motion/react"
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
} from "lucide-react"

type Props = {
  onSwitchToBrowse?: () => void
}

export default function NextAvailablePanel({ onSwitchToBrowse }: Props) {
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState(false)

  // GET /api/v1/slots/next-available
  const nextSlot = {
    id: "s_next_42",
    date: "Tomorrow, May 25",
    time: "09:30",
    remaining: 1,
    capacity: 1,
    projectedPosition: 2,
    inMinutes: 1380,
  }

  const handleBook = () => {
    setBooking(true)
    // POST /api/v1/appointments  { slotId: nextSlot.id }
    console.log("book next-available", nextSlot.id)
    setTimeout(() => {
      setBooking(false)
      setBooked(true)
    }, 700)
  }

  const hours = Math.floor(nextSlot.inMinutes / 60)
  const minutes = nextSlot.inMinutes % 60

  return (
    <div className="flex flex-1 flex-col">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_24px_rgba(6,95,70,0.25)]">
        <Sparkles className="size-6" />
      </span>
      <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-emerald-800/60 uppercase">
        Next available
      </p>
      <h2 className="mt-2 text-2xl font-bold">Soonest open slot</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Skip browsing the calendar — book the next open slot right now.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 to-emerald-700 p-6 text-white shadow-[0_18px_44px_rgba(6,95,70,0.28)]"
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-50/70 uppercase">
          Next open slot
        </p>
        <p className="mt-2 text-lg font-semibold">{nextSlot.date}</p>
        <p className="font-mono text-5xl leading-none font-bold tabular-nums">
          {nextSlot.time}
        </p>
        <p className="mt-2 text-xs text-emerald-50/80">
          In about {hours}h {minutes}m
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-4">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-emerald-50/70" />
            <div>
              <p className="text-[10px] tracking-wider text-emerald-50/70 uppercase">
                Position
              </p>
              <p className="font-mono text-base font-bold tabular-nums">
                #{nextSlot.projectedPosition}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-emerald-50/70" />
            <div>
              <p className="text-[10px] tracking-wider text-emerald-50/70 uppercase">
                Capacity
              </p>
              <p className="font-mono text-base font-bold tabular-nums">
                {nextSlot.remaining}/{nextSlot.capacity}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 flex flex-col gap-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleBook}
          disabled={booking || booked}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-800 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(6,95,70,0.25)] transition-colors hover:bg-emerald-900 disabled:opacity-70"
        >
          <CheckCircle2 className="size-4" />
          {booked ? "Booked!" : booking ? "Booking..." : "Book this slot"}
        </motion.button>
        {onSwitchToBrowse ? (
          <button
            type="button"
            onClick={onSwitchToBrowse}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            <CalendarDays className="size-4" />
            Pick a different time
          </button>
        ) : null}
      </div>
    </div>
  )
}
