"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  Clock,
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
import {
  Field,
  FieldError,
  FieldLabel,
} from "@careline/ui/components/field"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSlotSchema, CreateSlotForm } from "@/lib/schemas/slotsSchema"
import { useSettings } from "@/lib/queries/settings"
import { useCreateSlot } from "@/lib/queries/slots"
import { toast } from "sonner"
import { ErrorState, FormPageSkeleton } from "../../_components/states"

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

function combineDateTime(date: Date, time: string): string {
  const [h, m] = time.split(":").map(Number)
  const d = new Date(date)
  d.setHours(h ?? 0, m ?? 0, 0, 0)
  return d.toISOString()
}

export default function NewSingleSlotPage() {
  const router = useRouter()
  const { data: settings, isLoading, isError, refetch } = useSettings()
  const { mutateAsync: createSlot, isPending } = useCreateSlot()

  const [overrideCapacity, setOverrideCapacity] = useState(false)

  const form = useForm<CreateSlotForm>({
    resolver: zodResolver(createSlotSchema),
    defaultValues: {
      date: new Date(),
      time: "09:00",
      capacity: undefined,
    },
  })

  const handleSubmit = async (data: CreateSlotForm) => {
    // POST /api/v1/slots — body: { startDateTime, capacity? }
    try {
      await createSlot({
        startDateTime: combineDateTime(data.date, data.time),
        capacity: overrideCapacity ? data.capacity : undefined,
      })
      toast.success("Slot created successfully")
      router.push("/dashboard/appointments")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create slot")
    }
  }

  const errors = form.formState.errors

  if (isLoading && !settings)
    return <FormPageSkeleton sections={2} className="max-w-2xl" />
  if (isError)
    return (
      <ErrorState
        className="mx-auto max-w-2xl"
        title="Couldn't load clinic settings"
        description="Creating a slot needs your clinic hours and capacity. Check your connection and try again."
        onRetry={() => void refetch()}
      />
    )

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard/appointments">
            <ChevronLeft className="size-4" />
            Back to appointments
          </Link>
        </Button>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Create a slot
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Add a single bookable slot. It must fall on an open day and within
          clinic hours.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">When</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The date and start time of the slot.
            </p>
          </header>

          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="size-4 text-muted-foreground" />
                          {fmtDate(field.value)}
                        </span>
                        <ChevronDown className="size-4 opacity-60" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        required
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                        disabled={(date) =>
                          !settings?.clinicHours[String(date.getDay())]
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && <FieldError errors={[errors.date]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="time"
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="time">Start time</FieldLabel>
                  <Input
                    id="time"
                    type="time"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[errors.time]} />}
                </Field>
              )}
            />
          </div>
        </section>

        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Capacity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              How many bookings this slot can hold.
            </p>
          </header>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-muted/30 p-5">
            <div>
              <p className="text-sm font-medium">Override clinic default</p>
              <p className="mt-1 text-xs text-muted-foreground">
                When off, the slot uses the global capacity of{" "}
                {settings?.slotCapacity} from settings.
              </p>
            </div>
            <Switch
              checked={overrideCapacity}
              onCheckedChange={(checked) => {
                setOverrideCapacity(checked)
                form.setValue("capacity", checked ? 1 : undefined)
              }}
            />
          </div>
          {overrideCapacity ? (
            <Controller
              control={form.control}
              name="capacity"
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <Label htmlFor="capacity">Bookings per slot</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min={1}
                    max={10}
                    value={field.value ?? 1}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[errors.capacity]} />
                  )}
                </Field>
              )}
            />
          ) : null}
        </section>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" asChild>
            <Link href="/dashboard/appointments">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            <CalendarPlus className="size-4" />
            {isPending ? "Creating..." : "Create slot"}
          </Button>
        </div>
      </form>
    </div>
  )
}
