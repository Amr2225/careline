"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@careline/ui/components/button"
import Spinner from "@/components/spinner"
import { UserForm } from "@/components/user-form"
import { useRoles } from "@/lib/queries/roles"

export default function NewUserPage() {
  const rolesQuery = useRoles()

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/users">
            <ChevronLeft className="size-4" />
            Back to staff
          </Link>
        </Button>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          New staff member
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Create the account, set a starter password, and assign roles. They'll
          be able to log in immediately.
        </p>
      </div>

      {rolesQuery.isPending ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : rolesQuery.isError ? (
        <p className="text-sm text-destructive">Couldn't load roles.</p>
      ) : (
        <UserForm mode="create" roles={rolesQuery.data} />
      )}
    </div>
  )
}
