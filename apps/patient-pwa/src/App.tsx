import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BottomNavBar, type BottomNavTab } from "./components/bottom-nav-bar"
import AuthGuard from "./providers/AuthGuard"
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

function HomeMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M11.2 3.4a1.25 1.25 0 0 1 1.6 0l7 5.82c.29.24.46.6.46.97v8.56A2.25 2.25 0 0 1 18 21h-3.25a1 1 0 0 1-1-1v-4.25a1.75 1.75 0 0 0-3.5 0V20a1 1 0 0 1-1 1H6a2.25 2.25 0 0 1-2.25-2.25v-8.56c0-.38.17-.73.46-.97z" />
    </svg>
  )
}

function HistoryMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3.25a8.75 8.75 0 1 0 8.75 8.75h-2.5A6.25 6.25 0 1 1 12 5.75z" />
    </svg>
  )
}

function QueueMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.25 4h11.5A2.25 2.25 0 0 1 20 6.25v1A2.25 2.25 0 0 1 17.75 9H6.25A2.25 2.25 0 0 1 4 6.75v-.5A2.25 2.25 0 0 1 6.25 4M6.25 10.5h11.5A2.25 2.25 0 0 1 20 12.75v.5a2.25 2.25 0 0 1-2.25 2.25H6.25A2.25 2.25 0 0 1 4 13.25v-.5a2.25 2.25 0 0 1 2.25-2.25M6.25 17h11.5A2.25 2.25 0 0 1 20 19.25v.5A.25.25 0 0 1 19.75 20H4.25A.25.25 0 0 1 4 19.75v-.5A2.25 2.25 0 0 1 6.25 17" />
    </svg>
  )
}

function DataMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.75 3.75h12.5A2.75 2.75 0 0 1 21 6.5v11a2.75 2.75 0 0 1-2.75 2.75H5.75A2.75 2.75 0 0 1 3 17.5v-11a2.75 2.75 0 0 1 2.75-2.75m1.5 11.5a1 1 0 1 0 2 0v-3.5a1 1 0 1 0-2 0zm3.75 0a1 1 0 1 0 2 0v-6.5a1 1 0 1 0-2 0zm3.75 0a1 1 0 1 0 2 0v-4.5a1 1 0 1 0-2 0z" />
    </svg>
  )
}

function ProfileMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 12.25a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m-7.2 8.5h14.4c.82 0 1.45-.72 1.27-1.52C19.65 15.6 16.24 14 12 14s-7.65 1.6-8.47 5.23c-.18.8.45 1.52 1.27 1.52" />
    </svg>
  )
}
