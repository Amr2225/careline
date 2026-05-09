"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  roles: "Roles",
  new: "New",
  "queue-management": "Queue",
  insights: "Insights",
  settings: "Settings",
}

export function PageBreadcrumbs() {
  const pathname = usePathname()
  const parts = pathname.split("/").filter(Boolean)

  let acc = ""
  const crumbs = parts.map((p, i) => {
    acc += "/" + p
    const isLast = i === parts.length - 1
    const label =
      LABELS[p] ??
      (p.length > 12 ? p.slice(0, 8) + "…" : p[0]?.toUpperCase() + p.slice(1))
    return { href: acc, label, isLast }
  })

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      {crumbs.map((c, i) => (
        <Fragment key={c.href}>
          {i > 0 ? (
            <ChevronRight
              className="size-3.5 text-muted-foreground/60"
              aria-hidden
            />
          ) : null}
          {c.isLast ? (
            <span className="font-medium text-foreground">{c.label}</span>
          ) : (
            <Link
              href={c.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
