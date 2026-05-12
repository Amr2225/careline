"use client"

import { useState } from "react"
import { AtSign, ListFilter, Phone, Plus, User2, X } from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@careline/ui/components/popover"
import { cn } from "@careline/ui/lib/utils"

export type PatientFilterField = "name" | "email" | "phone"

export type PatientFilter = {
  field: PatientFilterField
  value: string
}

const FIELD_META: Record<
  PatientFilterField,
  { label: string; icon: React.ReactNode; placeholder: string }
> = {
  name: {
    label: "Name",
    icon: <User2 className="size-3.5" />,
    placeholder: "Ahmed Hassan",
  },
  email: {
    label: "Email",
    icon: <AtSign className="size-3.5" />,
    placeholder: "name@example.com",
  },
  phone: {
    label: "Phone",
    icon: <Phone className="size-3.5" />,
    placeholder: "+20 100…",
  },
}

const ALL_FIELDS: PatientFilterField[] = ["name", "email", "phone"]

type Props = {
  filters: PatientFilter[]
  onChange: (next: PatientFilter[]) => void
}

export function PatientsFilterPopover({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const activeFields = new Set(filters.map((f) => f.field))
  const availableFields = ALL_FIELDS.filter((f) => !activeFields.has(f))

  const addFilter = (field: PatientFilterField) => {
    onChange([...filters, { field, value: "" }])
  }

  const updateFilter = (index: number, value: string) => {
    onChange(filters.map((f, i) => (i === index ? { ...f, value } : f)))
  }

  const removeFilter = (index: number) => {
    onChange(filters.filter((_, i) => i !== index))
  }

  const clearAll = () => onChange([])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-9 gap-2 border-dashed",
            filters.length > 0 && "border-primary/40 bg-primary/5 text-primary"
          )}
        >
          <ListFilter className="size-4" />
          Filters
          {filters.length > 0 ? (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground tabular-nums">
              {filters.length}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[340px] rounded-2xl border-border/70 p-0 shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div>
            <p className="text-sm font-semibold tracking-tight">
              Search filters
            </p>
            <p className="text-xs text-muted-foreground">
              Combine fields to narrow the list.
            </p>
          </div>
          {filters.length > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={clearAll}
            >
              Clear all
            </Button>
          ) : null}
        </div>

        {filters.length > 0 ? (
          <div className="space-y-2 px-3 pt-3">
            {filters.map((f, i) => {
              const meta = FIELD_META[f.field]
              return (
                <div
                  key={`${f.field}-${i}`}
                  className="group rounded-xl border border-border/60 bg-muted/30 p-2.5 transition-colors focus-within:border-primary/40 focus-within:bg-primary/5"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                      {meta.icon}
                      {meta.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFilter(i)}
                      className="flex size-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Remove ${meta.label} filter`}
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <Input
                    autoFocus={i === filters.length - 1 && f.value === ""}
                    value={f.value}
                    placeholder={meta.placeholder}
                    onChange={(e) => updateFilter(i, e.target.value)}
                    className="h-8 border-0 bg-transparent px-1 text-sm shadow-none focus-visible:ring-0"
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="px-4 py-6 text-center">
            <p className="text-xs text-muted-foreground">
              No filters yet. Add one below to start searching.
            </p>
          </div>
        )}

        {availableFields.length > 0 ? (
          <div className="border-t border-border/60 px-3 py-3">
            <p className="px-1 pb-2 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Add a field
            </p>
            <div className="grid gap-1">
              {availableFields.map((field) => {
                const meta = FIELD_META[field]
                return (
                  <button
                    key={field}
                    type="button"
                    onClick={() => addFilter(field)}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <span className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      {meta.icon}
                    </span>
                    <span className="flex-1 font-medium">{meta.label}</span>
                    <Plus className="size-3.5 text-muted-foreground" />
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="border-t border-border/60 px-4 py-3">
            <p className="text-center text-[11px] text-muted-foreground">
              All available fields are active.
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export function ActiveFilterChips({
  filters,
  onRemove,
}: {
  filters: PatientFilter[]
  onRemove: (index: number) => void
}) {
  if (filters.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {filters.map((f, i) => {
        const meta = FIELD_META[f.field]
        const shown = f.value.trim() || "any"
        return (
          <span
            key={`${f.field}-${i}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 py-1 pr-1 pl-2.5 text-xs text-primary"
          >
            <span className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.08em] uppercase opacity-70">
              {meta.icon}
              {meta.label}
            </span>
            <span className="font-medium" title={shown}>
              {truncate(shown, 18)}
            </span>
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="flex size-4 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/15 hover:text-primary"
              aria-label={`Remove ${meta.label} filter`}
            >
              <X className="size-3" />
            </button>
          </span>
        )
      })}
    </div>
  )
}

function truncate(s: string, max: number) {
  if (s.length <= max) return s
  return s.slice(0, max - 1) + "…"
}
