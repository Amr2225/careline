"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from "@careline/ui/components/sidebar"
import Link from "next/link"
import {
  Calendar,
  ChartColumnIncreasing,
  HeartPulse,
  LayoutDashboard,
  ListOrdered,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { UserNav } from "./user-nav"
import { Action } from "@careline/shared/types/rbac.type"
import { hasPermission, type ModuleName } from "@/lib/permissions"
import { useAuthStore } from "@/store/user.store"

// `module` gates the item: it shows only when the user holds `module:read`.
// Items with no module (Dashboard home) are always visible.
type NavLink = {
  label: string
  href: string
  icon: React.ReactNode
  module?: ModuleName
}

const links: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Queue Management",
    href: "/dashboard/queue-management",
    icon: <ListOrdered />,
    module: "Queue",
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: <Users />,
    module: "Users",
  },
  {
    label: "Patients",
    href: "/dashboard/patients",
    icon: <HeartPulse />,
    module: "Patients",
  },
  {
    label: "Roles",
    href: "/dashboard/roles",
    icon: <ShieldCheck />,
    module: "Roles",
  },
  {
    label: "Appointments",
    href: "/dashboard/appointments",
    icon: <Calendar />,
    module: "Appointments",
  },
  {
    label: "Insights",
    href: "/dashboard/insights",
    icon: <ChartColumnIncreasing />,
    module: "Stats",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
    module: "Settings",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const permissions = useAuthStore((state) => state.user?.permissions)

  const visibleLinks = links.filter(
    (link) => !link.module || hasPermission(permissions, link.module, Action.READ)
  )

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center justify-center text-3xl font-bold"
        >
          <h1 className="text-primary">Care</h1>
          <h1>Line</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {visibleLinks.map((link) => {
              const isActive =
                link.href === "/dashboard"
                  ? pathname === link.href
                  : pathname === link.href ||
                    pathname.startsWith(link.href + "/")
              return (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="data-[active=true]:bg-primary/10 data-[active=true]:font-bold data-[active=true]:text-primary data-active:border-l-2 data-active:border-l-primary"
                  >
                    <Link href={link.href} className="py-6">
                      {link.icon} {link.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  )
}
