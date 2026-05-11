"use client"

import { useMemo, useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@careline/ui/components/popover"
import { Input } from "@careline/ui/components/input"
import { Badge } from "@careline/ui/components/badge"
import { cn } from "@careline/ui/lib/utils"
import type { Role } from "@/lib/api/roles"

type RoleMultiSelectProps = {
  roles: Role[]
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  disabled?: boolean
  excludePatient?: boolean
}

export function RoleMultiSelect({
  roles,
  value,
  onChange,
  placeholder = "Assign roles…",
  disabled = false,
  excludePatient = true,
}: RoleMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState("")

  const visibleRoles = useMemo(() => {
    return roles
      .filter((role) => (excludePatient ? role.name !== "Patient" : true))
      .filter((role) =>
        filter ? role.name.toLowerCase().includes(filter.toLowerCase()) : true
      )
  }, [roles, filter, excludePatient])

  const selectedRoles = roles.filter((role) => value.includes(role.name))

  const toggle = (name: string) => {
    if (value.includes(name)) {
      onChange(value.filter((v) => v !== name))
    } else {
      onChange([...value, name])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-input bg-card px-3 py-2 text-left text-sm transition-colors",
              "hover:border-primary/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-60",
              open && "border-primary/60 ring-3 ring-ring/30"
            )}
          >
            <div className="flex flex-1 flex-wrap items-center gap-1.5">
              {selectedRoles.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selectedRoles.map((role) => (
                  <Badge
                    key={role.id}
                    variant="outline"
                    className="gap-1 rounded-full border-primary/30 bg-primary/5 px-2 py-0.5 text-primary"
                  >
                    {role.name}
                    {!disabled && (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`Remove ${role.name}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggle(role.name)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            e.stopPropagation()
                            toggle(role.name)
                          }
                        }}
                        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/15"
                      >
                        <X className="size-3" />
                      </span>
                    )}
                  </Badge>
                ))
              )}
            </div>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) rounded-xl border-border/70 p-2"
        >
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search roles…"
            className="h-9 rounded-lg border-border/60 bg-muted/40"
          />
          <div className="mt-2 max-h-64 overflow-y-auto">
            {visibleRoles.length === 0 ? (
              <p className="px-2 py-3 text-center text-sm text-muted-foreground">
                No roles match.
              </p>
            ) : (
              visibleRoles.map((role) => {
                const checked = value.includes(role.name)
                return (
                  <button
                    key={role.name}
                    type="button"
                    onClick={() => toggle(role.name)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition-colors",
                      "hover:bg-muted",
                      checked && "bg-primary/5"
                    )}
                  >
                    <span className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {role.name}
                      </span>
                      {role.description ? (
                        <span className="text-xs text-muted-foreground">
                          {role.description}
                        </span>
                      ) : null}
                    </span>
                    {checked ? <Check className="size-4 text-primary" /> : null}
                  </button>
                )
              })
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
