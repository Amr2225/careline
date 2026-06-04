import { addDays, format, isBefore, isSameDay } from "date-fns"
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { useMemo, useState } from "react"

interface CalendarProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}
const WEEK_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [tomorrow] = useState(() => addDays(new Date(), 1))
  const [today] = useState(() => new Date())
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date(tomorrow)
    d.setDate(1)
    return d
  })

  const daysInMonth = useMemo(() => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const count = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: count }, (_, i) => new Date(year, month, i + 1))
  }, [viewMonth])

  const leadingBlanks = daysInMonth[0]?.getDay() ?? 0

  const sameMonth =
    selectedDate.getFullYear() === viewMonth.getFullYear() &&
    selectedDate.getMonth() === viewMonth.getMonth()

  return (
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
          <ChevronLeftIcon className="size-5" />
        </button>
        <div className="flex items-center gap-2 text-base font-bold text-slate-900">
          <CalendarDaysIcon className="size-4 text-emerald-800" />
          {format(viewMonth, "MMMM yyyy")}
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
          <ChevronRightIcon className="size-5" />
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

        {daysInMonth.map((date) => {
          const isPast = isBefore(date, today)
          const isToday = isSameDay(date, today)
          const isSelected =
            sameMonth && selectedDate.getDate() === date.getDate()
          return (
            <button
              key={date.getDate()}
              type="button"
              onClick={() => !isPast && setSelectedDate(date)}
              disabled={isPast}
              aria-label={date.toDateString()}
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
              {date.getDate()}
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
          {format(selectedDate, "EEE, MMM d")}
        </span>
      </div>
    </div>
  )
}
