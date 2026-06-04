import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CalendarPlus } from "lucide-react"
import NextAvailablePanel from "./next-available.js"
import { BrowseSlots } from "./browse-slots.js"

type SubView = "browse" | "next"

export default function BookingPage() {
  const [view, setView] = useState<SubView>("browse")

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_24px_rgba(6,95,70,0.25)]">
          <CalendarPlus className="size-6" />
        </span>
        <SegmentSwitcher value={view} onChange={setView} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mt-6 flex flex-1 flex-col"
        >
          {view === "browse" ? (
            <BrowseSlots onSeeNextAvailable={() => setView("next")} />
          ) : (
            <NextAvailablePanel onSwitchToBrowse={() => setView("browse")} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SegmentSwitcher({
  value,
  onChange,
}: {
  value: SubView
  onChange: (v: SubView) => void
}) {
  return (
    <div className="relative flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs">
      {(["browse", "next"] as const).map((key) => {
        const active = value === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className="relative z-10 rounded-full px-3 py-1.5 font-semibold transition-colors"
          >
            {active ? (
              <motion.span
                layoutId="book-segment"
                className="absolute inset-0 rounded-full bg-emerald-800 shadow-sm"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            ) : null}
            <span
              className={
                active ? "relative text-white" : "relative text-slate-500"
              }
            >
              {key === "browse" ? "Browse" : "Next open"}
            </span>
          </button>
        )
      })}
    </div>
  )
}
