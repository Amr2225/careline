import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BottomNavBar, type BottomNavTab } from "@/components/bottom-nav-bar.js"
import AuthGuard from "@/providers/AuthGuard.js"

import {
  HomePage,
  HistoryPage,
  QueuePage,
  DataPage,
  ProfilePage,
} from "./components/index.js"
import { useAuthStore } from "@/store/user.store.js"
import AppointmentsPage from "../appointment/appointments.js"
import BookingPage from "../book/page.js"

const pageCopy: Record<BottomNavTab, React.ReactElement> = {
  home: <HomePage />,
  book: <BookingPage />,
  history: <HistoryPage />,
  appointments: <AppointmentsPage />,
  queue: <QueuePage />,
  date: <DataPage />,
  profile: <ProfilePage />,
}

function App() {
  const user = useAuthStore((state) => state.user)

  const [activeTab, setActiveTab] = useState<BottomNavTab>("home")
  const activePage = pageCopy[activeTab]

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#fbf8f3] via-[#fdfaf5] to-[#f4efe6] text-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 bg-linear-to-b from-emerald-100/45 via-emerald-50/20 to-transparent blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-20%] z-0 size-80 rounded-full bg-emerald-200/30 blur-3xl"
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col px-6 pt-10 pb-32 md:max-w-lg md:px-0">
        <div className="mb-8 px-1">
          <p className="text-sm font-semibold tracking-[0.24em] text-emerald-800/70 uppercase">
            CareLine
          </p>
          <h1 className="mt-2 text-3xl font-bold capitalize">
            Welcome back, {user?.name}
          </h1>
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            className="flex flex-1 flex-col rounded-[2rem] border border-black/4 bg-white p-6 shadow-[0_24px_72px_-12px_rgba(15,23,42,0.12),0_1px_0_rgba(15,23,42,0.02)]"
            initial={{ opacity: 0, x: 34, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -34, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {activePage}
          </motion.section>
        </AnimatePresence>
      </main>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default AuthGuard(App)
