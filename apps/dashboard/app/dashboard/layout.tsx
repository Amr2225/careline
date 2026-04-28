import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@careline/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@careline/ui/components/sidebar"

export default function Dashboardlayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-full"
          />
          <h1>Dashboard</h1>
        </header>

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
