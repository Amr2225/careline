"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { cn } from "@careline/ui/lib/utils"
import { Controller, useForm } from "react-hook-form"
import {
  createSlotTemplateSchema,
  CreateSlotTemplateType,
} from "@/lib/schemas/slotTemplateSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@careline/ui/components/field"
import {
  useSlotTemplateById,
  useUpdateSlotTemplate,
  useDeleteSlotTemplate,
} from "@/lib/queries/slots"
import { extractErrorMessage } from "@/lib/errors"
import { toast } from "sonner"
import { MaterializeDialog } from "./MaterializeDialog"

const WEEKDAYS = [
  { value: 0, label: "Sunday", short: "Sun" },
  { value: 1, label: "Monday", short: "Mon" },
  { value: 2, label: "Tuesday", short: "Tue" },
  { value: 3, label: "Wednesday", short: "Wed" },
  { value: 4, label: "Thursday", short: "Thu" },
  { value: 5, label: "Friday", short: "Fri" },
  { value: 6, label: "Saturday", short: "Sat" },
]

export default function SlotTemplateForm({ id }: { id: string }) {
  const router = useRouter()
  const { data: templateData } = useSlotTemplateById(id)
  const { mutateAsync: updateSlotTemplate, isPending: saving } =
    useUpdateSlotTemplate(id)
  const { mutateAsync: deleteSlotTemplate, isPending: deleting } =
    useDeleteSlotTemplate(id)

  const form = useForm<CreateSlotTemplateType>({
    resolver: zodResolver(createSlotTemplateSchema),
    defaultValues: {
      name: templateData.name,
      weekday: templateData.weekday,
      startTime: templateData.startTime,
      endTime: templateData.endTime,
      capacityOverride: templateData.capacityOverride ?? 1,
      isActive: templateData.isActive,
    },
  })

  const [overrideCapacity, setOverrideCapacity] = useState(
    templateData.capacityOverride !== null
  )

  const handleSave = async (data: CreateSlotTemplateType) => {
    try {
      await updateSlotTemplate({ template: data })
      toast.success("Template updated")
    } catch (error) {
      toast.error("Failed to update template", {
        description: extractErrorMessage(error),
      })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteSlotTemplate()
    } catch (error) {
      toast.error("Failed to delete template", {
        description: extractErrorMessage(error),
      })
    }
  }
  // May 18, 2026
  const lastMaterializedLabel = templateData.lastRunAt
    ? format(templateData.lastRunAt, "MMM d, yyyy")
    : "Never"
  const errors = form.formState.errors

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
                templateData.isActive
                  ? "bg-linear-to-br from-primary/10 via-primary/4 to-transparent"
                  : "bg-muted/30"
              )}
            >
              <div
                className={cn(
                  "flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl font-mono shadow-sm",
                  templateData.isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <span className="text-[10px] font-semibold tracking-wider uppercase opacity-80">
                  {WEEKDAYS[templateData.weekday]?.short}
                </span>
                <LayoutTemplate className="mt-0.5 size-4" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {templateData.name || "Untitled template"}
                  </h1>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                      templateData.isActive
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        templateData.isActive
                          ? "bg-primary"
                          : "bg-muted-foreground/50"
                      )}
                    />
                    {templateData.isActive ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Every{" "}
                  <span className="font-medium text-foreground">
                    {WEEKDAYS[templateData.weekday]?.label}
                  </span>
                  ,{" "}
                  <span className="font-mono text-foreground tabular-nums">
                    {templateData.startTime}{" "}
                  </span>
                  -
                  <span className="font-mono text-foreground tabular-nums">
                    {" "}
                    {templateData.endTime}
                  </span>
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 divide-x divide-border/40 border-t border-border/40 lg:border-t-0 lg:border-l">
              <HeroStat
                icon={<CalendarRange className="size-4" />}
                label="Generated"
                value={templateData.generatedSlots}
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

      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="grid gap-6 lg:grid-cols-[1.5fr_1fr]"
      >
        <div className="space-y-6">
          <Section
            title="Details"
            description="Name and schedule that identify this template."
          >
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="name">Template Name</FieldLabel>
                    <Input
                      id="name"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[errors.name]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="weekday"
                render={({ field, fieldState }) => (
                  <Field className="space-y-2">
                    <FieldLabel>Day of week</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      {WEEKDAYS.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => field.onChange(d.value)}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                            field.value === d.value
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          )}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[errors.weekday]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="startTime"
                  render={({ field, fieldState }) => (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor="start-time">
                        <Clock className="size-3.5" />
                        Start time
                      </FieldLabel>
                      <Input id="start-time" type="time" {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[errors.startTime]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="endTime"
                  render={({ field, fieldState }) => (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor="end-time">
                        <Clock className="size-3.5" />
                        End time
                      </FieldLabel>
                      <Input id="end-time" type="time" {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[errors.endTime]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
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
              <Switch
                checked={overrideCapacity}
                onCheckedChange={setOverrideCapacity}
              />
            </div>
            {overrideCapacity ? (
              <div className="space-y-2">
                <Label htmlFor="capacity">Bookings per slot</Label>
                <Input
                  id="capacity"
                  type="number"
                  min={1}
                  max={10}
                  value={form.watch("capacityOverride")}
                  onChange={(e) =>
                    form.setValue("capacityOverride", Number(e.target.value))
                  }
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
                    templateData.isActive
                      ? "bg-primary/15 text-primary"
                      : "bg-background text-muted-foreground"
                  )}
                >
                  <CheckCircle2 className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {templateData.isActive ? "Active" : "Paused"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {templateData.isActive
                      ? "Generates slots on demand."
                      : "Materialize is disabled."}
                  </p>
                </div>
              </div>
              <Switch
                checked={form.watch("isActive")}
                onCheckedChange={(value) => form.setValue("isActive", value)}
              />
            </div>
          </Section>
        </div>

        <aside className="space-y-6">
          <section className="shadow-ambient rounded-2xl border border-primary/25 bg-linear-to-br from-primary/10 via-primary/4 to-transparent p-6">
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
                templateId={templateData.id}
                templateName={templateData.name}
                disabled={!templateData.isActive}
                versionKey="long"
              />
            </div>
            {!templateData.isActive ? (
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
                    disabled={deleting}
                  >
                    <Trash2 className="size-4" />
                    {deleting ? "Deleting..." : "Delete template"}
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
                    <AlertDialogAction
                      onClick={() => {
                        handleDelete()
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
              <span>Changes apply only to future materializations.</span>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" asChild>
                <Link href="/dashboard/appointments/templates">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={saving || !form.formState.isValid}
              >
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
