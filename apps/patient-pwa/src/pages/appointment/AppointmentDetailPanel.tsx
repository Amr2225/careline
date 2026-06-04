import { motion } from "motion/react"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Info,
  MapPin,
  QrCode,
  Users,
  XCircle,
} from "lucide-react"
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
import {
  useCancelAppointment,
  useGetAppointmentById,
} from "@/lib/queries/appointments"
import { format } from "date-fns"
import {
  AppointmentStatus,
  AppointmentStatusLabel,
} from "@careline/shared/types/appointment.type"
import { toast } from "sonner"
import { extractErrorMessage } from "@/lib/error"
import { DetailRow } from "./components/detail-row"
import { AppointmentDetailSkeleton } from "./components/appointments-detail-skeleton"
import { ApiError } from "@/components/Api-error"

type Props = {
  appointmentId: string
  onBack: () => void
  onCancelled?: () => void
}

export default function AppointmentDetailPanel({
  appointmentId,
  onBack,
  onCancelled,
}: Props) {
  const {
    data: appointment,
    isLoading,
    isError,
    dataUpdatedAt: lastUpdated,
  } = useGetAppointmentById(appointmentId)
  const cancelAppointment = useCancelAppointment(appointmentId)

  const handleCancel = () => {
    cancelAppointment.mutate(undefined, {
      onSuccess: () => {
        onCancelled?.()
        toast.success("Appointment cancelled")
        onBack()
      },
      onError: (error) => {
        toast.error("Failed to cancel appointment", {
          description: extractErrorMessage(error),
          richColors: true,
        })
      },
    })
  }

  if (isLoading && !appointment) return <AppointmentDetailSkeleton />
  if (isError && !appointment) return <ApiError />

  const isActive = ["BOOKED", "ARRIVED", "IN_PROGRESS"].includes(
    appointment.status
  )

  return (
    <div className="flex flex-1 flex-col">
      <button
        type="button"
        onClick={onBack}
        className="-ml-1 flex w-fit items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
      >
        <ArrowLeft className="size-3.5" />
        Back to visits
      </button>

      {appointment.position ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="mt-4 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 to-emerald-700 p-6 text-white shadow-[0_18px_44px_rgba(6,95,70,0.28)]"
        >
          <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-50/70 uppercase">
            You're in line
          </p>
          <p className="mt-2 font-mono text-6xl leading-none font-bold tabular-nums">
            #{appointment.position}
          </p>
          <p className="mt-3 text-xs text-emerald-50/80">
            Expected position. Confirmed on arrival via QR.
          </p>
          <p className="mt-1 text-[10px] tracking-wider text-emerald-50/50 uppercase">
            Updated {format(lastUpdated, "hh:mm:ss a")}
          </p>
        </motion.div>
      ) : (
        <div className="mt-4 rounded-3xl border border-slate-100 p-6">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-800/70 uppercase">
            Status
          </p>
          <p className="mt-2 text-2xl font-bold capitalize">
            {AppointmentStatusLabel[appointment.status]}
          </p>
        </div>
      )}

      <div className="mt-5 grid gap-2.5">
        <DetailRow
          icon={<CalendarDays className="size-4" />}
          label="Date"
          value={format(appointment.slot.startTime, "EEEE, MMM d")}
        />
        <DetailRow
          icon={<Clock className="size-4" />}
          label="Time"
          value={format(appointment.slot.startTime, "p")}
          mono
        />
        <DetailRow
          icon={<MapPin className="size-4" />}
          label="Clinic"
          value={"CareLine Clinic — Maadi branch"}
          sub={"12 Road 9, Maadi, Cairo"}
        />
        <DetailRow
          icon={<Users className="size-4" />}
          label="Status"
          value={appointment.status.toLowerCase().replace("_", " ")}
          valueClass="capitalize"
        />
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-800/15 bg-emerald-50/60 p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white">
            <QrCode className="size-4" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-emerald-900">
              Scan the QR when you arrive
            </p>
            <p className="text-xs leading-5 text-emerald-900/70">
              Your live queue spot locks in once you scan at reception. Aim to
              arrive 5 minutes early.
            </p>
          </div>
        </div>
      </div>

      {isActive ? (
        <div className="mt-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="h-12 w-full rounded-2xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              >
                <XCircle className="size-4" />
                Cancel appointment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel this appointment?</AlertDialogTitle>
                <AlertDialogDescription>
                  The slot will reopen for someone else. You can always book
                  another time.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep it</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancel}
                  className="bg-rose-600 hover:bg-rose-700"
                  disabled={cancelAppointment.isPending}
                >
                  {cancelAppointment.isPending
                    ? "Cancelling..."
                    : "Yes, cancel"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : appointment.status === AppointmentStatus.DONE ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="size-5" />
          You've been seen for this visit.
        </div>
      ) : appointment.status === AppointmentStatus.CANCELLED ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <Info className="size-5" />
          This appointment was cancelled.
        </div>
      ) : null}
    </div>
  )
}
