import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CalendarCheck, ChevronDown, ChevronRight, Clock } from "lucide-react"
import AppointmentDetailPanel from "./details.js"

type Status =
  | "BOOKED"
  | "ARRIVED"
  | "IN_PROGRESS"
  | "DONE"
  | "NO_SHOW"
  | "CANCELLED"

type MockAppointment = {
  id: string
  date: string
  time: string
  status: Status
  position: number | null
}

const STATUS_TONE: Record<Status, string> = {
  BOOKED: "bg-sky-50 text-sky-700",
  ARRIVED: "bg-amber-50 text-amber-700",
  IN_PROGRESS: "bg-violet-50 text-violet-700",
  DONE: "bg-emerald-50 text-emerald-700",
  NO_SHOW: "bg-rose-50 text-rose-700",
  CANCELLED: "bg-slate-100 text-slate-500",
}

const STATUS_LABEL: Record<Status, string> = {
  BOOKED: "Booked",
  ARRIVED: "Arrived",
  IN_PROGRESS: "In progress",
  DONE: "Completed",
  NO_SHOW: "No-show",
  CANCELLED: "Cancelled",
}

export default function AppointmentsPage() {
  // GET /api/v1/appointments/me
  const appointments: MockAppointment[] = [
    {
      id: "a_1",
      date: "Tomorrow, May 25",
      time: "09:30",
      status: "BOOKED",
      position: 2,
    },
    {
      id: "a_2",
      date: "Fri, May 29",
      time: "14:00",
      status: "BOOKED",
      position: 4,
    },
    {
      id: "a_3",
      date: "Mon, May 18",
      time: "10:00",
      status: "DONE",
      position: null,
    },
    {
      id: "a_4",
      date: "Tue, May 12",
      time: "11:30",
      status: "DONE",
      position: null,
    },
    {
      id: "a_5",
      date: "Sat, May 02",
      time: "13:00",
      status: "CANCELLED",
      position: null,
    },
  ]

  const upcoming = useMemo(
    () =>
      appointments.filter((a) =>
        ["BOOKED", "ARRIVED", "IN_PROGRESS"].includes(a.status)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const past = useMemo(
    () =>
      appointments.filter((a) =>
        ["DONE", "NO_SHOW", "CANCELLED"].includes(a.status)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [showPast, setShowPast] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="flex flex-1 flex-col">
      <AnimatePresence mode="wait" initial={false}>
        {openId ? (
          <motion.div
            key={`detail-${openId}`}
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -34 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="flex flex-1 flex-col"
          >
            <AppointmentDetailPanel
              appointmentId={openId}
              onBack={() => setOpenId(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -34 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 34 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="flex flex-1 flex-col"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_24px_rgba(6,95,70,0.25)]">
              <CalendarCheck className="size-6" />
            </span>
            <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-emerald-800/60 uppercase">
              My visits
            </p>
            <h2 className="mt-2 text-2xl font-bold">Upcoming & history</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your bookings and visit history at a glance.
            </p>

            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                  Upcoming
                </h3>
                <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                  {upcoming.length}
                </span>
              </div>

              {upcoming.length === 0 ? (
                <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-8 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    Nothing booked yet
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Tap "Book" in the nav to find an open slot.
                  </p>
                </div>
              ) : (
                <ul className="mt-3 space-y-2">
                  {upcoming.map((a, i) => (
                    <motion.li
                      key={a.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setOpenId(a.id)}
                        className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 text-left transition-all hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(6,95,70,0.08)]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex size-11 flex-col items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                            <span className="text-[9px] font-semibold tracking-wider uppercase opacity-70">
                              {a.date.split(",")[0].slice(0, 3)}
                            </span>
                            <Clock className="size-3" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-600">
                              {a.date}
                            </p>
                            <p className="font-mono text-base leading-tight font-bold tabular-nums">
                              {a.time}
                            </p>
                            <span
                              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_TONE[a.status]}`}
                            >
                              {STATUS_LABEL[a.status]}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {a.position ? (
                            <span className="font-mono text-xl font-bold text-emerald-800 tabular-nums">
                              #{a.position}
                            </span>
                          ) : null}
                          <ChevronRight className="size-4 text-slate-400" />
                        </div>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </section>

            {past.length > 0 ? (
              <section className="mt-6">
                <button
                  onClick={() => setShowPast(!showPast)}
                  className="flex w-full items-center justify-between"
                >
                  <h3 className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                    Past · <span className="font-mono">{past.length}</span>
                  </h3>
                  <ChevronDown
                    className={`size-4 text-slate-400 transition-transform ${showPast ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {showPast ? (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="mt-3 space-y-2 overflow-hidden"
                    >
                      {past.map((a) => (
                        <li
                          key={a.id}
                          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/40 p-3.5"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                              <Clock className="size-4" />
                            </span>
                            <div>
                              <p className="text-xs font-medium text-slate-700">
                                {a.date}
                              </p>
                              <p className="font-mono text-sm text-slate-500 tabular-nums">
                                {a.time}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_TONE[a.status]}`}
                          >
                            {STATUS_LABEL[a.status]}
                          </span>
                        </li>
                      ))}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </section>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
