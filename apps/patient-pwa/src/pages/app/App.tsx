import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  BottomNavBar,
  type BottomNavTab,
} from "../../components/bottom-nav-bar.js"
import AuthGuard from "../../providers/AuthGuard.js"
import { ChartLine, History, Home, ListOrdered, User } from "lucide-react"

function App() {
  const [activeTab, setActiveTab] = useState<BottomNavTab>("home")
  const activePage = pageCopy[activeTab]

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f3ee] text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-md flex-col px-8 pt-10 pb-32 md:max-w-lg md:px-0">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-[0.24em] text-emerald-800/70 uppercase">
            CareLine
          </p>
          <h1 className="mt-2 text-3xl font-bold">Patient App</h1>
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
            <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_24px_rgba(6,95,70,0.25)]">
              {activePage.Icon}
            </span>
            <p className="text-sm font-semibold tracking-[0.2em] text-emerald-800/60 uppercase">
              {activePage.label}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{activePage.title}</h2>
            <p className="mt-3 leading-7 text-slate-500">
              {activePage.description}
            </p>
          </motion.section>
        </AnimatePresence>
      </main>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default AuthGuard(App)

type PageCopy = {
  label: string
  title: string
  description: string
  Icon: React.ReactElement
}

const pageCopy: Record<BottomNavTab, PageCopy> = {
  home: {
    label: "Home",
    title: "Welcome back",
    description:
      "Track your upcoming care tasks, today’s reminders, and quick actions from one calm starting point.",
    Icon: <Home />,
  },
  history: {
    label: "History",
    title: "Visit history",
    description:
      "Review previous visits, notes, and completed care milestones with a smooth transition between sections.",
    Icon: <History />,
  },
  queue: {
    label: "Queue",
    title: "Live queue",
    description:
      "See your current place in line and follow appointment progress without leaving the mobile flow.",
    Icon: <ListOrdered />,
  },
  data: {
    label: "Data",
    title: "Health data",
    description:
      "Explore charts, readings, and care metrics in a dedicated tab that can later become its own route.",
    Icon: <ChartLine />,
  },
  profile: {
    label: "Profile",
    title: "Your profile",
    description:
      "Manage personal details, preferences, and account settings from the profile area.",
    Icon: <User />,
  },
}
