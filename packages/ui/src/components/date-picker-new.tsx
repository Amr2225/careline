"use client"

import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { ChangeEvent, ChangeEventHandler } from "react"
import { useState } from "react"
import { Button } from "@careline/ui/components/button"
import { Calendar } from "@careline/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@careline/ui/components/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@careline/ui/components/select"
import { cn } from "@careline/ui/lib/utils"

type DatePickerProps = {
  id: string
  disabled: boolean
  ariaInvalid: boolean
  value: string | undefined
  onChange: (date: string) => void
}

const DatePicker = ({
  id,
  disabled,
  ariaInvalid,
  value,
  onChange,
}: DatePickerProps) => {
  console.log("VALUE: ", value)
  const parseDateValue = (value: string | undefined) =>
    value ? parse(value.slice(0, 10), "yyyy-MM-dd", new Date()) : undefined

  const [date, setDate] = useState<Date | undefined>(() =>
    parseDateValue(value)
  )

  const handleCalendarChange = (
    value: string | number,
    event: ChangeEventHandler<HTMLSelectElement>
  ) => {
    const newEvent = {
      target: {
        value: String(value),
      },
    } as ChangeEvent<HTMLSelectElement>
    event(newEvent)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-[280px] justify-start bg-white text-left font-normal hover:bg-white active:border active:border-primary",
            !date && "text-muted-foreground"
          )}
          variant="input"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          id={id}
          captionLayout="dropdown"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          components={{
            MonthCaption: (props: any) => props.children,
            DropdownNav: (props) => (
              <div className="flex w-full items-center gap-2">
                {props.children}
              </div>
            ),
            Dropdown: (props) => (
              <Select
                onValueChange={(value) => {
                  if (props.onChange) {
                    handleCalendarChange(value, props.onChange)
                  }
                }}
                value={String(props.value)}
              >
                <SelectTrigger className="first:flex-1 last:shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {props.options?.map((option) => (
                    <SelectItem
                      disabled={option.disabled}
                      key={option.value}
                      value={String(option.value)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          }}
          hideNavigation
          mode="single"
          month={date}
          onMonthChange={setDate}
          onSelect={(date) => {
            setDate(date)
            onChange(date ? format(date, "yyyy-MM-dd") : "")
          }}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
