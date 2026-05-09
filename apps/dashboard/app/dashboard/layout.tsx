import { AppSidebar } from "@/components/app-sidebar"
import AuthBootstrap from "@/providers/AuthBootstrap"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
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
    <AuthBootstrap>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-border/60 bg-background/85 px-4 backdrop-blur-md">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-full"
            />
            <PageBreadcrumbs />
          </header>

          <main className="mx-auto w-full max-w-6xl p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthBootstrap>
  )
}
