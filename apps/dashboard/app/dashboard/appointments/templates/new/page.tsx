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
import {
  createSlotTemplateSchema,
  CreateSlotTemplateType,
} from "@/lib/schemas/slotTemplateSchemas"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@careline/ui/components/field"
import { useCreateSlotTemplate } from "@/lib/queries/slots"
import { toast } from "sonner"

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
  const [overrideCapacity, setOverrideCapacity] = useState(false)

  const { mutateAsync: createSlotTemplate, isPending } = useCreateSlotTemplate()

  const form = useForm<CreateSlotTemplateType>({
    resolver: zodResolver(createSlotTemplateSchema),
    shouldUnregister: true,
    defaultValues: {
      name: "",
      weekday: 1,
      startTime: "09:00",
      endTime: "17:00",
      capacityOverride: undefined,
      isActive: true,
    },
  })

  const handleSubmit = async (data: CreateSlotTemplateType) => {
    // body: { name, weekday, startTime, endTime, capacityOverride: overrideCapacity ? capacityOverride : null, isActive }
    try {
      await createSlotTemplate(data)
      router.push("/dashboard/appointments/templates")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create template")
    }
  }

  const errors = form.formState.errors

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

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <section className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6">
          <header>
            <h2 className="text-lg font-semibold">Schedule</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              When this template runs and how it's identified.
            </p>
          </header>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="name">Template name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="e.g. Weekday morning clinic"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[errors.name]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="weekday"
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="weekday">Day of week</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {WEEKDAYS.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => field.onChange(d.value)}
                        className={cn(
                          "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                          field.value === d.value
                            ? "border-primary bg-primary text-primary-foreground"
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
            <div className="grid gap-5 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="startTime"
                render={({ field, fieldState }) => (
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="start-time">Start time</FieldLabel>
                    <Input
                      id="start-time"
                      type="time"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
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
                    <FieldLabel htmlFor="end-time">End time</FieldLabel>
                    <Input
                      id="end-time"
                      type="time"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[errors.endTime]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
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
                value={form.watch("capacityOverride") ?? 1}
                onChange={(e) =>
                  form.setValue("capacityOverride", Number(e.target.value))
                }
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
          <Switch
            checked={form.watch("isActive") ?? true}
            onCheckedChange={(checked) => form.setValue("isActive", checked)}
          />
        </section>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" asChild>
            <Link href="/dashboard/appointments/templates">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={
              isPending || !form.formState.isValid || !form.formState.isDirty
            }
          >
            <Save className="size-4" />
            {isPending ? "Saving..." : "Create template"}
          </Button>
        </div>
      </form>
    </div>
  )
}
