"use client"

import { ReactNode, useState } from "react"
import { Button } from "@careline/ui/components/button"
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
import { AlertTriangle, ShieldAlert } from "lucide-react"
import Spinner from "./spinner"

type ConfirmDialogProps = {
  trigger: ReactNode
  title: string
  description: ReactNode
  actionLabel: string
  onConfirm: () => Promise<void> | void
  disabled?: boolean
  disabledReason?: string
  destructive?: boolean
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  actionLabel,
  onConfirm,
  disabled = false,
  disabledReason,
  destructive = true,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleConfirm = async () => {
    if (disabled) return
    try {
      setIsPending(true)
      await onConfirm()
      setOpen(false)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl border-border/60 bg-card p-0 shadow-ambient">
        <AlertDialogHeader className="space-y-3 px-6 pt-6">
          <div className="flex items-center gap-3">
            <span
              className={
                "flex size-10 items-center justify-center rounded-full " +
                (disabled
                  ? "bg-muted text-muted-foreground"
                  : destructive
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary")
              }
            >
              {disabled ? (
                <ShieldAlert className="size-5" />
              ) : (
                <AlertTriangle className="size-5" />
              )}
            </span>
            <AlertDialogTitle className="text-lg font-semibold tracking-tight">
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </div>
          </AlertDialogDescription>
          {disabled && disabledReason ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {disabledReason}
            </div>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter className="border-t border-border/60 bg-muted/40 px-6 py-4">
          <AlertDialogCancel asChild>
            <Button variant="ghost" size="lg" disabled={isPending}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              size="lg"
              variant={destructive ? "destructive" : "default"}
              disabled={disabled || isPending}
              onClick={(e) => {
                e.preventDefault()
                void handleConfirm()
              }}
            >
              {isPending ? <Spinner /> : actionLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
