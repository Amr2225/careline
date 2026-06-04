"use client"

import { Skeleton } from "@careline/ui/components/skeleton"
import { Button } from "@careline/ui/components/button"
import { CircleAlert, RotateCw } from "lucide-react"
import { cn } from "@careline/ui/lib/utils"

/**
 * Shared error placeholder for the appointments feature. Pass `onRetry`
 * (usually a React Query `refetch`) to surface a retry button.
 */
export function ErrorState({
  title = "Couldn't load this",
  description = "Something went wrong while fetching the data. Check your connection and try again.",
  onRetry,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn(
        "shadow-ambient flex flex-col items-center gap-5 rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 px-6 py-20 text-center",
        className
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <CircleAlert className="size-6" />
      </span>
      <div className="space-y-2">
        <p className="text-lg font-semibold">{title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          <RotateCw className="size-4" />
          Try again
        </Button>
      ) : null}
    </div>
  )
}

/** Skeleton for the 4-up (or 3-up) stat card row used across list pages. */
export function StatCardsSkeleton({
  count = 4,
  className = "sm:grid-cols-2 lg:grid-cols-4",
}: {
  count?: number
  className?: string
}) {
  return (
    <section className={cn("grid gap-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shadow-ambient flex items-start justify-between rounded-2xl border border-border/60 bg-card p-5"
        >
          <div className="space-y-2.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-12" />
          </div>
          <Skeleton className="size-9 rounded-full" />
        </div>
      ))}
    </section>
  )
}

/** Skeleton for the sectioned create/edit form pages. */
export function FormPageSkeleton({
  sections = 2,
  iconHeader = false,
  className = "max-w-2xl",
}: {
  sections?: number
  iconHeader?: boolean
  className?: string
}) {
  return (
    <div className={cn("mx-auto space-y-8", className)}>
      <div className="space-y-4">
        <Skeleton className="h-7 w-40" />
        <div
          className={cn("flex gap-4", iconHeader ? "items-start" : "flex-col")}
        >
          {iconHeader ? (
            <Skeleton className="size-12 shrink-0 rounded-2xl" />
          ) : null}
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
        </div>
      </div>

      {Array.from({ length: sections }).map((_, i) => (
        <section
          key={i}
          className="shadow-ambient space-y-6 rounded-2xl border border-border/70 bg-card p-6"
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </section>
      ))}

      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  )
}
