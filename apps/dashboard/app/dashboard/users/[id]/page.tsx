"use client"

import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, RotateCcw, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Badge } from "@careline/ui/components/badge"
import Spinner from "@/components/spinner"
import { UserForm } from "@/components/user-form"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useDeactivateUser, useUpdateUser, useUser } from "@/lib/queries/users"
import { useRoles } from "@/lib/queries/roles"
import { extractErrorMessage } from "@/lib/errors"

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const userQuery = useUser(id)
  const rolesQuery = useRoles()
  const deactivate = useDeactivateUser()
  const updateUser = useUpdateUser(id)

  const handleDeactivate = async () => {
    try {
      await deactivate.mutateAsync(id)
      toast.success("User deactivated", {
        description: "Sessions revoked. Reactivate any time.",
      })
      router.push("/dashboard/users")
    } catch (err) {
      toast.error("Blocked", {
        description: extractErrorMessage(err, "Couldn't deactivate this user."),
      })
    }
  }

  const handleReactivate = async () => {
    try {
      await updateUser.mutateAsync({ isActive: true })
      toast.success("User reactivated", {
        description: "They can log in again.",
      })
    } catch {
      toast.error("Couldn't reactivate.")
    }
  }

  if (userQuery.isPending || rolesQuery.isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }
  if (userQuery.isError || !userQuery.data) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-sm text-muted-foreground">User not found.</p>
        <Button asChild variant="ghost" className="mt-3">
          <Link href="/dashboard/users">Back to staff</Link>
        </Button>
      </div>
    )
  }

  const user = userQuery.data
  const roles = rolesQuery.data ?? []

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/users">
            <ChevronLeft className="size-4" />
            Back to staff
          </Link>
        </Button>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span>{user.email}</span>
              {user.isActive ? (
                <Badge
                  variant="outline"
                  className="gap-1.5 rounded-full border-primary/30 bg-primary/5 text-primary"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  Active
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="gap-1.5 rounded-full border-border bg-muted text-muted-foreground"
                >
                  <span className="size-1.5 rounded-full bg-muted-foreground/60" />
                  Inactive
                </Badge>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {user.isActive ? (
              <ConfirmDialog
                trigger={
                  <Button variant="destructive" size="lg">
                    <Trash2 className="size-4" />
                    Deactivate
                  </Button>
                }
                title="Deactivate this user?"
                description={
                  <span>
                    This will sign{" "}
                    <span className="font-medium text-foreground">
                      {user.name}
                    </span>{" "}
                    out of every device and prevent them from logging in until
                    reactivated. Their role assignments are kept.
                  </span>
                }
                actionLabel="Deactivate"
                onConfirm={handleDeactivate}
              />
            ) : (
              <Button
                size="lg"
                variant="secondary"
                onClick={handleReactivate}
                disabled={updateUser.isPending}
              >
                <RotateCcw className="size-4" />
                Reactivate
              </Button>
            )}
          </div>
        </div>
      </div>

      <UserForm mode="edit" roles={roles} initial={user} />
    </div>
  )
}
