"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  CalendarRange,
  ChevronLeft,
  Clock,
  LayoutTemplate,
  Pause,
  Plus,
  Sparkles,
  Users,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Switch } from "@careline/ui/components/switch"
import { Input } from "@careline/ui/components/input"
import { Label } from "@careline/ui/components/label"
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

const WEEKDAY_LABEL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type MockTemplate = {
  id: string
  name: string
  weekday: number
  startTime: string
  endTime: string
  capacityOverride: number | null
  isActive: boolean
  generatedSlotCount: number
}

export default function TemplatesPage() {
  // GET /api/v1/slot-templates
  const initial: MockTemplate[] = [
    {
      id: "t_1",
      name: "Weekday morning clinic",
      weekday: 1,
      startTime: "09:00",
      endTime: "13:00",
      capacityOverride: null,
      isActive: true,
      generatedSlotCount: 32,
    },
    {
      id: "t_2",
      name: "Wednesday triage",
      weekday: 3,
      startTime: "10:00",
      endTime: "16:00",
      capacityOverride: 2,
      isActive: true,
      generatedSlotCount: 48,
    },
    {
      id: "t_3",
      name: "Saturday catch-up",
      weekday: 6,
      startTime: "11:00",
      endTime: "15:00",
      capacityOverride: null,
      isActive: false,
      generatedSlotCount: 0,
    },
  ]
  const [templates, setTemplates] = useState(initial)

  const toggle = (id: string) => {
    // PATCH /api/v1/slot-templates/:id  { isActive }
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    )
  }

  const stats = useMemo(() => {
    const active = templates.filter((t) => t.isActive).length
    const paused = templates.length - active
    const totalSlots = templates.reduce(
      (acc, t) => acc + t.generatedSlotCount,
      0
    )
    return { active, paused, totalSlots, total: templates.length }
  }, [templates])

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard/appointments">
            <ChevronLeft className="size-4" />
            Back to appointments
          </Link>
        </Button>
        <header className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LayoutTemplate className="size-5" />
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Slot templates
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground">
                Recurring weekly schedules. Materialize a template to generate
                the next N weeks of slots in one click.
              </p>
            </div>
          </div>
          <Button size="lg" asChild>
            <Link href="/dashboard/appointments/templates/new">
              <Plus className="size-4" />
              New template
            </Link>
          </Button>
        </header>
      </div>

      {templates.length > 0 ? (
        <section className="grid gap-3 sm:grid-cols-3">
          <StatPill
            label="Active"
            value={stats.active}
            tone="primary"
            icon={<Sparkles className="size-4" />}
          />
          <StatPill
            label="Paused"
            value={stats.paused}
            tone="muted"
            icon={<Pause className="size-4" />}
          />
          <StatPill
            label="Slots generated"
            value={stats.totalSlots}
            tone="muted"
            icon={<CalendarRange className="size-4" />}
          />
        </section>
      ) : null}

      {templates.length === 0 ? (
        <section className="shadow-ambient flex flex-col items-center gap-5 rounded-2xl border border-dashed border-border/70 bg-card px-6 py-20 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LayoutTemplate className="size-6" />
          </span>
          <div className="space-y-2">
            <p className="text-lg font-semibold">No templates yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Create a recurring weekly template to stop creating slots manually
              every week.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/dashboard/appointments/templates/new">
              <Plus className="size-4" />
              New template
            </Link>
          </Button>
        </section>
      ) : (
        <section className="grid gap-5 md:grid-cols-2">
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onToggle={() => toggle(t.id)}
            />
          ))}
        </section>
      )}
    </div>
  )
}

function TemplateCard({
  template,
  onToggle,
}: {
  template: MockTemplate
  onToggle: () => void
}) {
  return (
    <article
      className={cn(
        "shadow-ambient group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]",
        !template.isActive && "bg-muted/20"
      )}
    >
      <header
        className={cn(
          "flex items-start justify-between gap-4 border-b border-border/40 px-6 py-5",
          template.isActive
            ? "bg-gradient-to-br from-primary/8 to-transparent"
            : "bg-muted/30"
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl text-center font-mono",
              template.isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            <span className="text-[10px] font-semibold tracking-wider uppercase opacity-80">
              {WEEKDAY_SHORT[template.weekday]}
            </span>
            <span className="text-xs font-bold">weekly</span>
          </div>
          <div className="space-y-1 pt-0.5">
            <h3 className="text-lg leading-tight font-semibold">
              {template.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Every{" "}
              <span className="font-medium text-foreground">
                {WEEKDAY_LABEL[template.weekday]}
              </span>
            </p>
          </div>
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
            template.isActive
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              template.isActive ? "bg-primary" : "bg-muted-foreground/50"
            )}
          />
          {template.isActive ? "Active" : "Paused"}
        </span>
      </header>

      <div className="grid grid-cols-3 gap-4 px-6 py-5">
        <MetaCell
          icon={<Clock className="size-3.5" />}
          label="Hours"
          value={
            <span className="font-mono tabular-nums">
              {template.startTime}
              <span className="px-0.5 text-muted-foreground">–</span>
              {template.endTime}
            </span>
          }
        />
        <MetaCell
          icon={<Users className="size-3.5" />}
          label="Capacity"
          value={
            template.capacityOverride !== null ? (
              <span className="font-mono tabular-nums">
                {template.capacityOverride}
              </span>
            ) : (
              <span className="text-muted-foreground italic">default</span>
            )
          }
        />
        <MetaCell
          icon={<CalendarRange className="size-3.5" />}
          label="Generated"
          value={
            <span className="font-mono tabular-nums">
              {template.generatedSlotCount}
            </span>
          }
        />
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-border/40 bg-muted/20 px-6 py-4">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <Switch checked={template.isActive} onCheckedChange={onToggle} />
          <span className="whitespace-nowrap">
            {template.isActive ? "Active" : "Paused"}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <MaterializeDialog
            templateId={template.id}
            templateName={template.name}
            disabled={!template.isActive}
          />
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/appointments/templates/${template.id}`}>
              Edit
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  )
}

function MetaCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
        {icon}
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}

function StatPill({
  label,
  value,
  tone,
  icon,
}: {
  label: string
  value: number
  tone: "primary" | "muted"
  icon: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "shadow-ambient flex items-center justify-between rounded-2xl border px-5 py-4",
        tone === "primary"
          ? "border-primary/20 bg-primary/4"
          : "border-border/60 bg-card"
      )}
    >
      <div>
        <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-1 font-mono text-2xl font-bold tracking-tight tabular-nums">
          {value}
        </p>
      </div>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          tone === "primary"
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </span>
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
        <Button size="sm" disabled={disabled}>
          <Sparkles className="size-3.5" />
          Materialize
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Materialize "{templateName}"</DialogTitle>
          <DialogDescription>
            Generate slots from this template starting next week. Duplicate
            slots are skipped automatically.
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
            <Sparkles className="size-3.5" />
            Generate slots
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
