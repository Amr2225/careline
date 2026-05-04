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
} from "./_components/index.js"
import { useAuthStore } from "@/store/user.store.js"

const pageCopy: Record<BottomNavTab, React.ReactElement> = {
  home: <HomePage />,
  history: <HistoryPage />,
  queue: <QueuePage />,
  data: <DataPage />,
  profile: <ProfilePage />,
}

function App() {
  const user = useAuthStore((state) => state.user)

  const [activeTab, setActiveTab] = useState<BottomNavTab>("home")
  const activePage = pageCopy[activeTab]

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f3ee] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-md flex-col px-8 pt-10 pb-32 md:max-w-lg md:px-0">
        <div className="mb-8">
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
            className="flex flex-1 flex-col rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
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
