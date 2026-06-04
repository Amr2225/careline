import Spinner from "@/components/spinner"
import { useDeleteSlot } from "@/lib/queries/slots"
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
import { Trash2Icon } from "lucide-react"
import { format } from "date-fns"

export function DeleteSlotDialog({
  slotId,
  slotTime,
}: {
  slotId: string
  slotTime: string
}) {
  const deleteSlot = useDeleteSlot(slotId)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={deleteSlot.isPending}>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-none"
          aria-label="Delete empty slot"
        >
          {deleteSlot.isPending ? (
            <Spinner />
          ) : (
            <Trash2Icon className="size-3.5" />
          )}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete empty slot?</AlertDialogTitle>
          <AlertDialogDescription>
            The {format(slotTime, "EEE d MMM, p")} slot has no bookings. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteSlot.isPending}
            onClick={(e) => {
              void deleteSlot.mutate()
            }}
            className="bg-rose-600 hover:bg-rose-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
