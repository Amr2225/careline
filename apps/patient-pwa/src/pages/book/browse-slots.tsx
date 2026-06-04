import { addDays, format } from "date-fns"
import { CheckCircle2, ChevronRight, Clock, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { useAvailableSlots } from "@/lib/queries/slots"
import type { SlotWithProjectedPosition } from "@careline/shared/types/slots.type"
import { useBookAppointment } from "@/lib/queries/appointments"
import { toast } from "sonner"
import { extractErrorMessage } from "@/lib/error"
import { Calendar } from "./components/calendar"
import { ConfirmBookDialog } from "./components/confirm-book-dialog"
import { BrowseSlotsSkeleton } from "./components/browse-slots-skeleton"
import { ApiError } from "@/components/Api-error"

export function BrowseSlots({
  onSeeNextAvailable,
}: {
  onSeeNextAvailable: () => void
}) {
  const tomorrow = addDays(new Date(), 1)
  const [selectedDate, setSelectedDate] = useState<Date>(tomorrow)
  const [confirmSlot, setConfirmSlot] =
    useState<SlotWithProjectedPosition | null>(null)
  const [bookedId, setBookedId] = useState<string | null>(null)

  const {
    data: availableSlots,
    isLoading,
    isError,
  } = useAvailableSlots(selectedDate.toISOString())
  const bookAppoitment = useBookAppointment(selectedDate.toISOString())

  const handleBook = () => {
    if (!confirmSlot) return

    bookAppoitment.mutate(confirmSlot.id, {
      onSuccess: () => {
        toast.success("Appointment booked successfully")
        setBookedId(confirmSlot.id)
        setConfirmSlot(null)
      },
      onError: (error) => {
        setConfirmSlot(null)
        toast.error("Failed to book appointment", {
          description: extractErrorMessage(error),
          richColors: true,
        })
      },
    })
  }

  if (isLoading && !availableSlots) return <BrowseSlotsSkeleton />
  if (isError) return <ApiError />

  return (
    <>
      <p className="text-sm font-semibold tracking-[0.2em] text-emerald-800/60 uppercase">
        Book a visit
      </p>
      <h2 className="mt-2 text-2xl font-bold">Pick a time</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Browse open slots for the next two weeks and tap one to book.
      </p>

      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="mt-5 flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
          {availableSlots.length} open slots
        </p>
        <button
          type="button"
          onClick={onSeeNextAvailable}
          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800"
        >
          <Sparkles className="size-3" />
          Next available
        </button>
      </div>

      {availableSlots.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Clock className="size-5" />
          </span>
          <p className="mt-3 text-sm font-semibold">All booked up</p>
          <p className="mt-1 text-xs text-slate-500">
            No open slots on this day. Try another date.
          </p>
        </div>
      ) : (
        <ul className="mt-3 space-y-2">
          <AnimatePresence initial={false}>
            {availableSlots.map((slot, i) => {
              const justBooked = bookedId === slot.id
              return (
                <motion.li
                  key={slot.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setConfirmSlot(slot)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      justBooked
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-100 bg-white hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(6,95,70,0.08)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl ${
                          justBooked
                            ? "bg-emerald-800 text-white"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {justBooked ? (
                          <CheckCircle2 className="size-5" />
                        ) : (
                          <Clock className="size-5" />
                        )}
                      </span>
                      <div>
                        <p className="font-mono text-base leading-tight font-bold tabular-nums">
                          {format(slot.startTime, "p")}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {slot.capacity - slot.bookedCount} of {slot.capacity}{" "}
                          open · #{slot.projectedPosition + slot.bookedCount}{" "}
                          projected
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-slate-400" />
                  </motion.button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}

      <ConfirmBookDialog
        confirmSlot={confirmSlot}
        setConfirmSlot={setConfirmSlot}
        selectedDate={selectedDate}
        handleBook={handleBook}
        isPending={bookAppoitment.isPending}
      />
    </>
  )
}
