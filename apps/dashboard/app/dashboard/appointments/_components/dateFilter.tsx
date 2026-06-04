import { Button } from "@careline/ui/components/button"
import { Calendar } from "@careline/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@careline/ui/components/popover"
import { addDays, format, isSameDay } from "date-fns"
import { CalendarDays, ChevronDown, ChevronRight } from "lucide-react"

interface DateFilterProps {
  date: Date
  setDate: (date: Date) => void
  view: "week" | "day"
}

function fmtWeekRange(start: Date) {
  const end = addDays(start, 6)
  const sameMonth = start.getMonth() === end.getMonth()

  if (sameMonth) return `${format(start, "MMMM d")} - ${format(end, "d, yyyy")}`
  return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`
}

export const DateFilter = ({ date, setDate, view }: DateFilterProps) => {
  const isToday = isSameDay(date, new Date())

  return (
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
          <Button variant="outline" className="min-w-[220px] justify-between">
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
        <Button variant="ghost" size="sm" onClick={() => setDate(new Date())}>
          Today
        </Button>
      ) : null}
    </div>
  )
}
