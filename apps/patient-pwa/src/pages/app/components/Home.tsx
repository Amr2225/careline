import { Home } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-[0_10px_24px_rgba(6,95,70,0.25)]">
        <Home />
      </span>
      <p className="text-sm font-semibold tracking-[0.2em] text-emerald-800/60 uppercase">
        Home
      </p>
      <h2 className="mt-2 text-2xl font-bold">Welcome Back</h2>
      <p className="mt-3 leading-7 text-slate-500">
        Welcome back to your patient portal. Here you can manage your
        appointments, view your medical history, and more.
      </p>
    </>
  )
}

// const pageCopy: Record<BottomNavTab, PageCopy> = {
//   home: {
//     label: "Home",
//     title: "Welcome back",
//     description:
//       "Track your upcoming care tasks, today’s reminders, and quick actions from one calm starting point.",
//     Icon: <Home />,
//   },
//   history: {
//     label: "History",
//     title: "Visit history",
//     description:
//       "Review previous visits, notes, and completed care milestones with a smooth transition between sections.",
//     Icon: <History />,
//   },
//   queue: {
//     label: "Queue",
//     title: "Live queue",
//     description:
//       "See your current place in line and follow appointment progress without leaving the mobile flow.",
//     Icon: <ListOrdered />,
//   },
//   data: {
//     label: "Data",
//     title: "Health data",
//     description:
//       "Explore charts, readings, and care metrics in a dedicated tab that can later become its own route.",
//     Icon: <ChartLine />,
//   },
//   profile: {
//     label: "Profile",
//     title: "Your profile",
//     description:
//       "Manage personal details, preferences, and account settings from the profile area.",
//     Icon: <User />,
//   },
// }
