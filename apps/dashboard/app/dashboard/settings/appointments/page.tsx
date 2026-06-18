"use client"

import { useState } from "react"
import { Clock, Info, Save, Settings, Users } from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Label } from "@careline/ui/components/label"
import { Switch } from "@careline/ui/components/switch"
import { cn } from "@careline/ui/lib/utils"
import { useUpdateSettings } from "@/lib/queries/settings"

type Hours = { open: string; close: string } | null

const WEEKDAYS = [
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
]

export default function AppointmentSettingsPage() {
  // GET /api/v1/settings
  const initial = {
    appointmentDurationMinutes: 30,
    slotCapacity: 1,
    clinicHours: {
      "0": { open: "09:00", close: "17:00" },
      "1": { open: "09:00", close: "17:00" },
      "2": { open: "09:00", close: "17:00" },
      "3": { open: "09:00", close: "17:00" },
      "4": { open: "09:00", close: "17:00" },
      "5": null,
      "6": null,
    } as Record<string, Hours>,
  }

  const [duration, setDuration] = useState(initial.appointmentDurationMinutes)
  const [capacity, setCapacity] = useState(initial.slotCapacity)
  const [hours, setHours] = useState<Record<string, Hours>>(initial.clinicHours)
  const [saved, setSaved] = useState(false)
  const updateSettings = useUpdateSettings()
  const saving = updateSettings.isPending

  const setDay = (day: string, value: Hours) => {
    setHours((prev) => ({ ...prev, [day]: value }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(false)
    updateSettings.mutate(
      { appointmentDurationMinutes: duration, slotCapacity: capacity, clinicHours: hours },
      {
        onSuccess: () => {
          setSaved(true)
          setTimeout(() => setSaved(false), 2400)
        },
      }
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Settings className="size-5" />
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Appointment settings</h1>
          <p className="text-sm text-muted-foreground">
            Clinic-wide defaults for slot duration, per-slot capacity, and operating hours.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Slot defaults</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Applied when new slots are created or templates are materialized.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Clock className="size-3.5" />
                Slot duration (minutes)
              </Label>
              <Input
                id="duration"
                type="number"
                min={5}
                max={120}
                step={5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Used by bulk-create and template materialization.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity" className="flex items-center gap-2">
                <Users className="size-3.5" />
                Slot capacity (default)
              </Label>
              <Input
                id="capacity"
                type="number"
                min={1}
                max={10}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                How many patients can book the same slot. Templates can override.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            <span>
              Changes to capacity affect <strong>newly created slots only</strong>.
              Existing slots keep their original capacity.
            </span>
          </div>
        </section>

        <section className="shadow-ambient space-y-5 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Clinic hours</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Slot creation outside these hours is rejected. Turn a day off to mark the clinic closed.
            </p>
          </header>

          <ul className="divide-y divide-border/40 rounded-2xl border border-border/60 bg-muted/20">
            {WEEKDAYS.map((d) => {
              const dayHours = hours[d.value]
              const isOpen = !!dayHours
              return (
                <li
                  key={d.value}
                  className={cn(
                    "grid grid-cols-1 items-center gap-4 px-5 py-4 sm:grid-cols-[140px_auto_1fr]",
                    !isOpen && "opacity-60"
                  )}
                >
                  <span className="text-sm font-medium">{d.label}</span>
                  <Switch
                    checked={isOpen}
                    onCheckedChange={(checked) =>
                      setDay(d.value, checked ? { open: "09:00", close: "17:00" } : null)
                    }
                  />
                  {isOpen && dayHours ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={dayHours.open}
                        onChange={(e) => setDay(d.value, { ...dayHours, open: e.target.value })}
                        className="w-32"
                      />
                      <span className="text-sm text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={dayHours.close}
                        onChange={(e) => setDay(d.value, { ...dayHours, close: e.target.value })}
                        className="w-32"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">Closed</span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <div className="flex items-center justify-end gap-3 pt-2">
          {saved ? (
            <span className="text-sm text-emerald-600">Saved.</span>
          ) : null}
          {updateSettings.isError ? (
            <span className="text-sm text-destructive">Couldn&apos;t save. Try again.</span>
          ) : null}
          <Button type="submit" disabled={saving}>
            <Save className="size-4" />
            {saving ? "Saving..." : "Save settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
