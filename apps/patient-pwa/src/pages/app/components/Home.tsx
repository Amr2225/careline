import { useMemo } from "react"
import { motion } from "motion/react"
import { CalendarPlus, ChevronRight, Clock, HomeIcon } from "lucide-react"
import { format, formatRelative } from "date-fns"
import { enUS } from "date-fns/locale"
import { useGetMyAppointments } from "@/lib/queries/appointments.js"
import { useNavStore } from "@/store/nav.store.js"
import { AppointmentStatusLabel } from "@careline/shared/types/appointment.type"

const customLocale = {
  ...enUS,
  formatLong: {
    ...enUS.formatLong,
    date: () => "EEE, MMM d",
  },
}

export default function HomePage() {
  const { data: appointments, isLoading } = useGetMyAppointments()
  const openAppointment = useNavStore((state) => state.openAppointment)

  // The "very next" visit: the soonest still-upcoming booked slot.
  const nextAppointment = useMemo(() => {
    const now = new Date().getTime()
    return (
      appointments
        ?.filter(
          (a) =>
            a.status === "BOOKED" &&
            new Date(a.slot.startTime).getTime() > now
        )
        .sort(
          (a, b) =>
            new Date(a.slot.startTime).getTime() -
            new Date(b.slot.startTime).getTime()
        )[0] ?? null
    )
  }, [appointments])

  return (
    <>
      <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_24px_rgba(6,95,70,0.25)]">
        <HomeIcon />
      </span>
      <p className="text-sm font-semibold tracking-[0.2em] text-emerald-800/60 uppercase">
        Home
      </p>
      <h2 className="mt-2 text-2xl font-bold">Welcome Back</h2>
      <p className="mt-3 leading-7 text-slate-500">
        Welcome back to your patient portal. Here you can manage your
        appointments, view your medical history, and more.
      </p>

      <section className="mt-8">
        <h3 className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
          Next appointment
        </h3>

        {isLoading && !appointments ? (
          <div className="mt-3 h-[88px] animate-pulse rounded-2xl border border-slate-100 bg-slate-50" />
        ) : nextAppointment ? (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openAppointment(nextAppointment.id)}
            className="mt-3 flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 text-left transition-all hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(6,95,70,0.08)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 flex-col items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <span className="text-[9px] font-semibold tracking-wider uppercase opacity-70">
                  {format(nextAppointment.slot.startTime, "EEE")}
                </span>
                <Clock className="size-3" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-600">
                  {formatRelative(nextAppointment.slot.startTime, new Date(), {
                    locale: customLocale,
                  })}
                </p>
                <p className="font-mono text-base leading-tight font-bold tabular-nums">
                  {format(nextAppointment.slot.startTime, "p")}
                </p>
                <span className="mt-1 inline-block rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                  {AppointmentStatusLabel[nextAppointment.status]}
                </span>
              </div>
            </div>
            <ChevronRight className="size-4 text-slate-400" />
          </motion.button>
        ) : (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm">
              <CalendarPlus className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-700">
                No upcoming visits
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Tap &ldquo;Book&rdquo; in the nav to find an open slot.
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
