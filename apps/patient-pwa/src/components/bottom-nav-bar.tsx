import type { ComponentType, SVGProps } from "react"
import { motion } from "motion/react"

export type BottomNavTab =
  | "home"
  | "book"
  | "appointments"
  | "queue"
  | "profile"
  | "history"
  | "date"

type IconProps = SVGProps<SVGSVGElement>

type NavItem = {
  value: BottomNavTab
  label: string
  Icon: ComponentType<IconProps>
}

type BottomNavBarProps = {
  activeTab: BottomNavTab
  onTabChange: (tab: BottomNavTab) => void
}

const bottomNavItems: NavItem[] = [
  { value: "home", label: "Home", Icon: HomeIcon },
  { value: "book", label: "Book", Icon: BookIcon },
  { value: "appointments", label: "Visits", Icon: VisitsIcon },
  { value: "queue", label: "Queue", Icon: QueueIcon },
  { value: "profile", label: "Profile", Icon: ProfileIcon },
]

export function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <motion.nav
      aria-label="Primary navigation"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-[2rem] border border-black/5 bg-white/95 px-3 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur md:max-w-lg"
      initial={{ y: 34, opacity: 0, scale: 0.96 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <div className="grid grid-cols-5 items-end gap-1">
        {bottomNavItems.map(({ value, label, Icon }) => {
          const isActive = activeTab === value

          return (
            <button
              key={value}
              type="button"
              aria-current={isActive ? "page" : undefined}
              className="relative flex min-h-16 items-center justify-center rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-800/40"
              onClick={() => onTabChange(value)}
            >
              {isActive ? (
                <motion.span
                  layoutId="bottom-nav-active-pill"
                  className="absolute inset-x-1 top-0 h-16 rounded-3xl bg-emerald-800 shadow-[0_10px_22px_rgba(6,95,70,0.28)]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : null}

              <motion.span
                className="relative z-10 flex flex-col items-center justify-center gap-1"
                animate={{
                  y: isActive ? -1 : 0,
                  scale: isActive ? 1 : 0.96,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                <motion.span
                  animate={{
                    rotate: isActive ? [0, -8, 8, 0] : 0,
                    scale: isActive ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                >
                  <Icon
                    className={
                      isActive
                        ? "size-5 text-white md:size-6"
                        : "size-5 text-neutral-400 md:size-6"
                    }
                  />
                </motion.span>
                <span
                  className={
                    isActive
                      ? "text-[0.62rem] font-bold tracking-wide text-white uppercase"
                      : "text-[0.62rem] font-bold tracking-wide text-neutral-400 uppercase"
                  }
                >
                  {label}
                </span>
              </motion.span>
            </button>
          )
        })}
      </div>
    </motion.nav>
  )
}

function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M11.2 3.4a1.25 1.25 0 0 1 1.6 0l7 5.82c.29.24.46.6.46.97v8.56A2.25 2.25 0 0 1 18 21h-3.25a1 1 0 0 1-1-1v-4.25a1.75 1.75 0 0 0-3.5 0V20a1 1 0 0 1-1 1H6a2.25 2.25 0 0 1-2.25-2.25v-8.56c0-.38.17-.73.46-.97z" />
    </svg>
  )
}

function BookIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M12 14v4" />
      <path d="M10 16h4" />
    </svg>
  )
}

function VisitsIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M7.5 14.5l2 2 4.5-4.5" />
    </svg>
  )
}

function QueueIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.25 4h11.5A2.25 2.25 0 0 1 20 6.25v1A2.25 2.25 0 0 1 17.75 9H6.25A2.25 2.25 0 0 1 4 6.75v-.5A2.25 2.25 0 0 1 6.25 4M6.25 10.5h11.5A2.25 2.25 0 0 1 20 12.75v.5a2.25 2.25 0 0 1-2.25 2.25H6.25A2.25 2.25 0 0 1 4 13.25v-.5a2.25 2.25 0 0 1 2.25-2.25M6.25 17h11.5A2.25 2.25 0 0 1 20 19.25v.5A.25.25 0 0 1 19.75 20H4.25A.25.25 0 0 1 4 19.75v-.5A2.25 2.25 0 0 1 6.25 17" />
    </svg>
  )
}

function ProfileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 12.25a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m-7.2 8.5h14.4c.82 0 1.45-.72 1.27-1.52C19.65 15.6 16.24 14 12 14s-7.65 1.6-8.47 5.23c-.18.8.45 1.52 1.27 1.52" />
    </svg>
  )
}
