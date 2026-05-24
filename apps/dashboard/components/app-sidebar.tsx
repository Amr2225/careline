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

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Queue Management",
    href: "/dashboard/queue-management",
    icon: <ListOrdered />,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: <Users />,
  },
  {
    label: "Patients",
    href: "/dashboard/patients",
    icon: <HeartPulse />,
  },
  {
    label: "Roles",
    href: "/dashboard/roles",
    icon: <ShieldCheck />,
  },
  {
    label: "Insights",
    href: "/dashboard/insights",
    icon: <ChartColumnIncreasing />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

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
            {links.map((link) => {
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
