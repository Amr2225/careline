"use client"
import { extractErrorMessage } from "@/lib/errors"
import { useMaterializeSlots } from "@/lib/queries/patient"
import { Button } from "@careline/ui/components/button"
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@careline/ui/components/dialog"
import { Label } from "@careline/ui/components/label"
import { Input } from "@careline/ui/components/input"
import { Sparkles } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const VERSIONS = {
  short: {
    title: "Materialize",
    className: "",
    size: "sm",
  },
  long: {
    title: "Materialize next weeks",
    className: "w-full",
    size: "default",
  },
}

export function MaterializeDialog({
  templateId,
  templateName,
  disabled,
  versionKey,
}: {
  templateId: string
  templateName: string
  versionKey: keyof typeof VERSIONS
  disabled?: boolean
}) {
  const { mutateAsync: materializeSlots, isPending: materializing } =
    useMaterializeSlots(templateId)

  const [weeks, setWeeks] = useState(4)
  const [open, setOpen] = useState(false)

  const handle = async () => {
    try {
      await materializeSlots({ fromDate: new Date().toISOString(), weeks })
    } catch (error) {
      toast.error("Failed to materialize slots", {
        description: extractErrorMessage(error),
      })
    }
    setOpen(false)
  }

  const selectedVersion = VERSIONS[versionKey]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={selectedVersion.className}
          size={selectedVersion.size as "sm" | "default"}
          disabled={disabled}
        >
          <Sparkles className="size-4" />
          {selectedVersion.title}
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
          <Button onClick={handle} disabled={materializing}>
            <Sparkles className="size-4" />
            {materializing ? "Generating..." : "Generate slots"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
