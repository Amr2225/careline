import type { SlotWithProjectedPosition } from "@careline/shared/types/slots.type"
import { Button } from "@careline/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@careline/ui/components/dialog"
import { format } from "date-fns"
import { CheckCircle2Icon, UsersIcon } from "lucide-react"

function formatDate(date: Date | string) {
  return format(date, "EEE, MMM d")
}

interface ConfirmBookDialog {
  confirmSlot: SlotWithProjectedPosition | null
  setConfirmSlot: (slot: SlotWithProjectedPosition | null) => void
  selectedDate: Date
  handleBook: () => void
  isPending: boolean
}

export const ConfirmBookDialog = ({
  confirmSlot,
  setConfirmSlot,
  selectedDate,
  handleBook,
  isPending,
}: ConfirmBookDialog) => {
  return (
    <Dialog
      open={!!confirmSlot}
      onOpenChange={(open) => !open && setConfirmSlot(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm your booking</DialogTitle>
          <DialogDescription>
            {confirmSlot ? (
              <>
                {formatDate(selectedDate)} at{" "}
                <strong className="font-mono">
                  {format(confirmSlot.startTime, "p")}
                </strong>
              </>
            ) : null}
          </DialogDescription>
        </DialogHeader>

        {confirmSlot ? (
          <div className="rounded-2xl border border-emerald-800/15 bg-emerald-50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-800 text-white">
                <UsersIcon className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-emerald-800/70 uppercase">
                  Projected position
                </p>
                <p className="font-mono text-2xl font-bold text-emerald-900 tabular-nums">
                  #{confirmSlot.projectedPosition + confirmSlot.bookedCount}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-emerald-900/70">
              This is where you'll be when the day starts. Your actual queue
              position locks in when you scan the QR on arrival.
            </p>
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="ghost" onClick={() => setConfirmSlot(null)}>
            Cancel
          </Button>
          <Button onClick={handleBook} disabled={isPending}>
            <CheckCircle2Icon className="size-4" />
            {isPending ? "Booking..." : "Confirm booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
