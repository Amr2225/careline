"use client"

import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Lock, Trash2, Users as UsersIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Badge } from "@careline/ui/components/badge"
import Spinner from "@/components/spinner"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { RoleForm } from "@/components/role-form"
import { useDeleteRole, useRole } from "@/lib/queries/roles"
import { extractErrorMessage } from "@/lib/errors"

const PROTECTED = new Set(["Manager", "Patient"])

export default function EditRolePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const roleQuery = useRole(id)
  const deleteRole = useDeleteRole()

  const handleDelete = async () => {
    try {
      await deleteRole.mutateAsync(id)
      toast.success("Role deleted")
      router.push("/dashboard/roles")
    } catch (err) {
      toast.error("Blocked", {
        description: extractErrorMessage(err, "Couldn't delete this role."),
      })
    }
  }

  if (roleQuery.isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }
  if (roleQuery.isError || !roleQuery.data) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-sm text-muted-foreground">Role not found.</p>
        <Button asChild variant="ghost" className="mt-3">
          <Link href="/dashboard/roles">Back to roles</Link>
        </Button>
      </div>
    )
  }

  const role = roleQuery.data
  const isProtected = role.isSystem && PROTECTED.has(role.name)
  const canDelete = !isProtected && role._count.users === 0

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/roles">
            <ChevronLeft className="size-4" />
            Back to roles
          </Link>
        </Button>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{role.name}</h1>
              {isProtected ? (
                <span
                  aria-label="Protected role"
                  className="flex size-6 items-center justify-center rounded-full bg-primary/15 text-primary"
                >
                  <Lock className="size-3.5" />
                </span>
              ) : null}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Badge
                variant="outline"
                className="gap-1.5 rounded-full border-border/70 bg-muted/40 text-muted-foreground"
              >
                <UsersIcon className="size-3" />
                {role._count.users} {role._count.users === 1 ? "user" : "users"}{" "}
                assigned
              </Badge>
              <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                {role.isSystem ? "System" : "Custom"}
              </span>
            </div>
          </div>
          {!isProtected ? (
            <ConfirmDialog
              trigger={
                <Button variant="destructive" size="lg">
                  <Trash2 className="size-4" />
                  Delete role
                </Button>
              }
              title={`Delete the ${role.name} role?`}
              description={
                role._count.users > 0 ? (
                  <span>
                    <span className="font-medium text-foreground">
                      {role._count.users}{" "}
                      {role._count.users === 1 ? "user holds" : "users hold"}
                    </span>{" "}
                    this role. Reassign them first.
                  </span>
                ) : (
                  <span>
                    This permanently removes the{" "}
                    <span className="font-medium text-foreground">
                      {role.name}
                    </span>{" "}
                    role. No users currently hold it.
                  </span>
                )
              }
              actionLabel="Delete role"
              onConfirm={handleDelete}
              disabled={!canDelete}
              disabledReason={
                role._count.users > 0
                  ? `Reassign the ${role._count.users} ${role._count.users === 1 ? "user" : "users"} who currently hold this role first.`
                  : undefined
              }
            />
          ) : null}
        </div>
      </div>

      <RoleForm mode="edit" initial={role} />
    </div>
  )
}
