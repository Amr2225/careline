"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  CalendarRange,
  CheckCircle2,
  ChevronLeft,
  Clock,
  History,
  LayoutTemplate,
  Save,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Label } from "@careline/ui/components/label"
import { Switch } from "@careline/ui/components/switch"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@careline/ui/components/dialog"
import { cn } from "@careline/ui/lib/utils"

const WEEKDAYS = [
  { value: 0, label: "Sunday", short: "Sun" },
  { value: 1, label: "Monday", short: "Mon" },
  { value: 2, label: "Tuesday", short: "Tue" },
  { value: 3, label: "Wednesday", short: "Wed" },
  { value: 4, label: "Thursday", short: "Thu" },
  { value: 5, label: "Friday", short: "Fri" },
  { value: 6, label: "Saturday", short: "Sat" },
]

export default function EditTemplatePage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const templateId = params.id

  // GET /api/v1/slot-templates/:id
  const mockTemplate = {
    id: templateId,
    name: "Weekday morning clinic",
    weekday: 1,
    startTime: "09:00",
    endTime: "13:00",
    capacityOverride: null as number | null,
    isActive: true,
    generatedSlotCount: 32,
    lastMaterializedAt: "2026-05-18T10:00:00",
    createdAt: "2026-04-02T09:15:00",
  }

  const [name, setName] = useState(mockTemplate.name)
  const [weekday, setWeekday] = useState(mockTemplate.weekday)
  const [startTime, setStartTime] = useState(mockTemplate.startTime)
  const [endTime, setEndTime] = useState(mockTemplate.endTime)
  const [overrideCapacity, setOverrideCapacity] = useState(mockTemplate.capacityOverride !== null)
  const [capacityOverride, setCapacityOverride] = useState(mockTemplate.capacityOverride ?? 2)
  const [isActive, setIsActive] = useState(mockTemplate.isActive)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // PATCH /api/v1/slot-templates/:id
    console.log("save template", templateId, {
      name, weekday, startTime, endTime,
      capacityOverride: overrideCapacity ? capacityOverride : null,
      isActive,
    })
    setTimeout(() => {
      setSaving(false)
      setSavedAt(new Date())
    }, 500)
  }

  const lastMaterializedLabel = mockTemplate.lastMaterializedAt
    ? new Date(mockTemplate.lastMaterializedAt).toLocaleDateString(undefined, {
        month: "short", day: "numeric", year: "numeric",
      })
    : "never"

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard/appointments/templates">
            <ChevronLeft className="size-4" />
            Back to templates
          </Link>
        </Button>

        <header className="shadow-ambient mt-4 overflow-hidden rounded-2xl border border-border/70 bg-card">
          <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
            <div
              className={cn(
                "flex items-start gap-5 p-6",
                isActive
                  ? "bg-gradient-to-br from-primary/10 via-primary/4 to-transparent"
                  : "bg-muted/30"
              )}
            >
              <div
                className={cn(
                  "flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl font-mono shadow-sm",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <span className="text-[10px] font-semibold tracking-wider uppercase opacity-80">
                  {WEEKDAYS[weekday]?.short}
                </span>
                <LayoutTemplate className="mt-0.5 size-4" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">{name || "Untitled template"}</h1>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        isActive ? "bg-primary" : "bg-muted-foreground/50"
                      )}
                    />
                    {isActive ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Every <span className="font-medium text-foreground">{WEEKDAYS[weekday]?.label}</span>,{" "}
                  <span className="font-mono tabular-nums text-foreground">{startTime}</span> –{" "}
                  <span className="font-mono tabular-nums text-foreground">{endTime}</span>
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 divide-x divide-border/40 border-t border-border/40 lg:border-t-0 lg:border-l">
              <HeroStat
                icon={<CalendarRange className="size-4" />}
                label="Generated"
                value={mockTemplate.generatedSlotCount}
                sub="slots to date"
              />
              <HeroStat
                icon={<History className="size-4" />}
                label="Last run"
                value={lastMaterializedLabel}
                sub="materialization"
                mono={false}
              />
            </dl>
          </div>
        </header>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Section
            title="Details"
            description="Name and schedule that identify this template."
          >
            <div className="space-y-2">
              <Label htmlFor="name">Template name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
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
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-time" className="flex items-center gap-2">
                  <Clock className="size-3.5" />
                  Start time
                </Label>
                <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time" className="flex items-center gap-2">
                  <Clock className="size-3.5" />
                  End time
                </Label>
                <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          </Section>

          <Section
            title="Capacity"
            description="How many patients can book a single slot from this template."
          >
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground">
                  <Users className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">Override clinic default</p>
                  <p className="text-xs text-muted-foreground">
                    Off uses the global slot capacity from settings.
                  </p>
                </div>
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
          </Section>

          <Section
            title="Status"
            description="Paused templates can't be materialized."
          >
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    isActive ? "bg-primary/15 text-primary" : "bg-background text-muted-foreground"
                  )}
                >
                  <CheckCircle2 className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{isActive ? "Active" : "Paused"}</p>
                  <p className="text-xs text-muted-foreground">
                    {isActive
                      ? "Generates slots on demand."
                      : "Materialize is disabled."}
                  </p>
                </div>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
          </Section>
        </div>

        <aside className="space-y-6">
          <section className="shadow-ambient rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-primary/4 to-transparent p-6">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Generate slots now</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Materialize this template for the upcoming weeks. Duplicate slots
              are skipped automatically.
            </p>
            <div className="mt-5">
              <MaterializeDialog
                templateId={templateId}
                templateName={mockTemplate.name}
                disabled={!isActive}
              />
            </div>
            {!isActive ? (
              <p className="mt-3 text-xs text-muted-foreground italic">
                Activate the template above to enable materialization.
              </p>
            ) : null}
          </section>

          <section className="shadow-ambient rounded-2xl border border-rose-200/70 bg-rose-50/30 p-6">
            <h2 className="text-sm font-semibold text-rose-700">Danger zone</h2>
            <p className="mt-1 text-xs text-rose-700/70">
              Deleting removes the template. Slots already generated remain
              untouched and become orphan slots.
            </p>
            <div className="mt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-rose-200 text-rose-700 hover:bg-rose-100 hover:text-rose-800"
                  >
                    <Trash2 className="size-4" />
                    Delete template
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this template?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Slots already generated from this template will remain.
                      The template itself will be removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* DELETE /api/v1/slot-templates/:id */}
                    <AlertDialogAction
                      onClick={() => {
                        console.log("delete template", templateId)
                        router.push("/dashboard/appointments/templates")
                      }}
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </section>
        </aside>

        <div className="lg:col-span-2">
          <div className="shadow-ambient flex flex-col items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card px-6 py-4 sm:flex-row">
            <div className="text-xs text-muted-foreground">
              {savedAt ? (
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  Saved {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              ) : (
                <span>Changes apply only to future materializations.</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" asChild>
                <Link href="/dashboard/appointments/templates">Cancel</Link>
              </Button>
              <Button type="submit" disabled={saving || !name}>
                <Save className="size-4" />
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="shadow-ambient rounded-2xl border border-border/70 bg-card p-6">
      <header className="mb-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function HeroStat({
  icon,
  label,
  value,
  sub,
  mono = true,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  sub: string
  mono?: boolean
}) {
  return (
    <div className="flex flex-col justify-center gap-1 p-6">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
        {icon}
        {label}
      </span>
      <span
        className={cn(
          "text-2xl font-bold tracking-tight",
          mono && "font-mono tabular-nums"
        )}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{sub}</span>
    </div>
  )
}

function MaterializeDialog({
  templateId,
  templateName,
  disabled,
}: {
  templateId: string
  templateName: string
  disabled?: boolean
}) {
  const [weeks, setWeeks] = useState(4)
  const [open, setOpen] = useState(false)

  const handle = () => {
    // POST /api/v1/slot-templates/:id/materialize  { weeks }
    console.log("materialize", templateId, "weeks:", weeks)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={disabled}>
          <Sparkles className="size-4" />
          Materialize next weeks
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Materialize "{templateName}"</DialogTitle>
          <DialogDescription>
            Generate slots from this template starting next week. Duplicate slots
            are skipped automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <Label htmlFor="weeks">Weeks ahead</Label>
          <Input
            id="weeks"
            type="number"
            min={1}
            max={26}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            Up to 26 weeks (≈6 months) at a time.
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handle}>
            <Sparkles className="size-4" />
            Generate slots
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
