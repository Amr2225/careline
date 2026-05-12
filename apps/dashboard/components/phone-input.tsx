"use client"

import * as React from "react"
import { Phone } from "lucide-react"
import { Input } from "@careline/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@careline/ui/components/select"
import { cn } from "@careline/ui/lib/utils"

const COUNTRIES = [
  { code: "EG", dial: "+20", label: "EG" },
  { code: "SA", dial: "+966", label: "SA" },
  { code: "AE", dial: "+971", label: "AE" },
  { code: "US", dial: "+1", label: "US" },
  { code: "UK", dial: "+44", label: "UK" },
] as const

type CountryCode = (typeof COUNTRIES)[number]["code"]

export type PhoneInputProps = {
  value: string
  onChange: (next: string) => void
  defaultCountry?: CountryCode
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  id?: string
}

export function PhoneInput({
  value,
  onChange,
  defaultCountry = "EG",
  placeholder = "100 123 4567",
  disabled,
  invalid,
  id,
}: PhoneInputProps) {
  const [country, setCountry] = React.useState<CountryCode>(defaultCountry)

  const dial = COUNTRIES.find((c) => c.code === country)?.dial ?? "+20"

  // Strip leading dial from value for display
  const display = React.useMemo(() => {
    const trimmed = value.trim()
    if (trimmed.startsWith(dial)) return trimmed.slice(dial.length).trim()
    return trimmed
  }, [value, dial])

  return (
    <div
      className={cn(
        "flex items-stretch rounded-md border border-input bg-transparent shadow-xs transition-colors focus-within:ring-1 focus-within:ring-ring",
        invalid && "border-destructive focus-within:ring-destructive",
        disabled && "opacity-60"
      )}
    >
      <Select
        value={country}
        onValueChange={(v) => setCountry(v as CountryCode)}
        disabled={disabled}
      >
        <SelectTrigger className="h-9 w-[7.5rem] shrink-0 rounded-r-none border-0 border-r border-input bg-muted/30 px-3 text-sm shadow-none focus-visible:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {c.dial}
                </span>
                <span>{c.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative flex-1">
        <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={disabled}
          aria-invalid={invalid}
          value={display}
          placeholder={placeholder}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^\d\s-]/g, "")
            onChange(cleaned ? `${dial} ${cleaned.trim()}` : "")
          }}
          className="h-9 rounded-l-none border-0 pl-9 shadow-none focus-visible:ring-0"
        />
      </div>
    </div>
  )
}
