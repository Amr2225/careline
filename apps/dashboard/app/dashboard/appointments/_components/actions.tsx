import Spinner from "@/components/spinner"
import {
  useActionsState,
  useMarkArrived,
  useMarkNoShow,
} from "@/lib/queries/appointments"
import { AppointmentStatus } from "@careline/shared/prisma/index"
import { Button } from "@careline/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@careline/ui/components/dropdown-menu"
import { CheckIcon, MoreHorizontalIcon, XIcon } from "lucide-react"

interface ActionsProps {
  appointmentId: string
  status: AppointmentStatus
  onOpenChange?: (open: boolean) => void
}

export const Actions = ({
  appointmentId,
  status,
  onOpenChange,
}: ActionsProps) => {
  const markArrived = useMarkArrived(appointmentId)
  const markNoShow = useMarkNoShow(appointmentId)
  const { isLoading } = useActionsState(appointmentId)

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size="icon"
          disabled={isLoading || status !== "BOOKED"}
        >
          {isLoading ? <Spinner /> : <MoreHorizontalIcon className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => markArrived.mutate()}
          disabled={markArrived.isPending}
        >
          <CheckIcon className="size-4" />
          Mark as arrived
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => markNoShow.mutate()}
          disabled={markNoShow.isPending}
        >
          <XIcon className="size-4" />
          Mark as no-show
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
