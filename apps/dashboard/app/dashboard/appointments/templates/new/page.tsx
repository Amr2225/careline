"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, LayoutTemplate, Save } from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Label } from "@careline/ui/components/label"
import { Switch } from "@careline/ui/components/switch"
import { cn } from "@careline/ui/lib/utils"

const WEEKDAYS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
]

export default function NewTemplatePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [weekday, setWeekday] = useState(1)
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [overrideCapacity, setOverrideCapacity] = useState(false)
  const [capacityOverride, setCapacityOverride] = useState(2)
  const [isActive, setIsActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // POST /api/v1/slot-templates
    // body: { name, weekday, startTime, endTime, capacityOverride: overrideCapacity ? capacityOverride : null, isActive }
    console.log("create template", { name, weekday, startTime, endTime, capacityOverride: overrideCapacity ? capacityOverride : null, isActive })
    setTimeout(() => {
      setSubmitting(false)
      router.push("/dashboard/appointments/templates")
    }, 500)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard/appointments/templates">
            <ChevronLeft className="size-4" />
            Back to templates
          </Link>
        </Button>
        <div className="mt-4 flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LayoutTemplate className="size-5" />
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">New template</h1>
            <p className="text-sm text-muted-foreground">
              A weekly recurring schedule that can be materialized into slots.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Schedule</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              When this template runs and how it's identified.
            </p>
          </header>
          <div className="space-y-2">
            <Label htmlFor="name">Template name</Label>
            <Input
              id="name"
              placeholder="e.g. Weekday morning clinic"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Day of week</Label>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setWeekday(d.value)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                    weekday === d.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start time</Label>
              <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End time</Label>
              <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
        </section>

        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Capacity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              How many bookings each generated slot can hold.
            </p>
          </header>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-muted/30 p-5">
            <div>
              <p className="text-sm font-medium">Override clinic default</p>
              <p className="mt-1 text-xs text-muted-foreground">
                When off, slots use the global slot capacity from settings.
              </p>
            </div>
            <Switch checked={overrideCapacity} onCheckedChange={setOverrideCapacity} />
          </div>
          {overrideCapacity ? (
            <div className="space-y-2">
              <Label htmlFor="capacity">Bookings per slot</Label>
              <Input
                id="capacity"
                type="number"
                min={1}
                max={10}
                value={capacityOverride}
                onChange={(e) => setCapacityOverride(Number(e.target.value))}
              />
            </div>
          ) : null}
        </section>

        <section className="shadow-ambient flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-6">
          <div>
            <p className="text-sm font-medium">Active on create</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Paused templates can't be materialized.
            </p>
          </div>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </section>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" asChild>
            <Link href="/dashboard/appointments/templates">Cancel</Link>
          </Button>
          <Button type="submit" disabled={submitting || !name}>
            <Save className="size-4" />
            {submitting ? "Saving..." : "Create template"}
          </Button>
        </div>
      </form>
    </div>
  )
}
