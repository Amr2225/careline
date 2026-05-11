"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { RoleForm } from "@/components/role-form"

export default function NewRolePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/roles">
            <ChevronLeft className="size-4" />
            Back to roles
          </Link>
        </Button>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">New role</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Bundle a set of module permissions into a reusable role. Assign it to
          users from the staff page.
        </p>
      </div>

      <RoleForm mode="create" />
    </div>
  )
}
