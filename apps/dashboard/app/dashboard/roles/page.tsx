"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Plus, ShieldCheck, Trash2, Users as UsersIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Badge } from "@careline/ui/components/badge"
import Spinner from "@/components/spinner"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useDeleteRole, useRoles } from "@/lib/queries/roles"
import type { RoleListItem } from "@/lib/api/roles"
import { extractErrorMessage } from "@/lib/errors"
import { cn } from "@careline/ui/lib/utils"

const PROTECTED = new Set(["Manager", "Patient"])

export default function RolesListPage() {
  const router = useRouter()
  const rolesQuery = useRoles()
  const deleteRole = useDeleteRole()

  const handleDelete = async (role: RoleListItem) => {
    try {
      await deleteRole.mutateAsync(role.id)
      toast.success("Role deleted", { description: `${role.name} is gone.` })
    } catch (err) {
      toast.error("Blocked", {
        description: extractErrorMessage(err, "Couldn't delete this role."),
      })
    }
  }

  const roles = rolesQuery.data

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1.5">
          <p className="text-label-md text-muted-foreground">
            Phase 3 · Roles & permissions
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Role library</h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Roles bundle permissions across the eight clinic modules. Manager
            and Patient are locked — everything else is yours to shape.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/roles/new">
            <Plus className="size-4" />
            New role
          </Link>
        </Button>
      </header>

      {rolesQuery.isPending ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : rolesQuery.isError ? (
        <p className="text-center text-sm text-destructive">
          Couldn't load roles.
        </p>
      ) : roles && roles.length === 0 ? (
        <div className="shadow-ambient flex flex-col items-center gap-4 rounded-2xl border border-border/70 bg-card px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <div className="space-y-1">
            <p className="font-semibold">No roles yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Create your first role to start assigning fine-grained
              permissions.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/roles/new">
              <Plus className="size-4" />
              New role
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {roles?.map((role) => {
            const isProtected = role.isSystem && PROTECTED.has(role.name)
            return (
              <article
                key={role.id}
                className={cn(
                  "shadow-ambient group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-5 transition-all",
                  "hover:-translate-y-px hover:border-primary/30 hover:shadow-lg",
                  isProtected
                    ? "border-primary/25 bg-gradient-to-br from-primary/[0.04] to-transparent"
                    : "border-border/70"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {role.name}
                      </h3>
                      {isProtected ? (
                        <span
                          aria-label="Protected role"
                          className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary"
                        >
                          <Lock className="size-3" />
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {role.description || "No description."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="gap-1.5 rounded-full border-border/70 bg-muted/40 text-muted-foreground"
                  >
                    <UsersIcon className="size-3" />
                    {role.userCount}{" "}
                    {role.userCount === 1 ? "user" : "users"}
                  </Badge>
                  {role.isSystem ? (
                    <span className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                      System
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold tracking-[0.1em] text-primary uppercase">
                      Custom
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/dashboard/roles/${role.id}`)}
                  >
                    {isProtected ? "View" : "Edit"}
                  </Button>
                  {!isProtected ? (
                    <ConfirmDialog
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${role.name}`}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      }
                      title={`Delete the ${role.name} role?`}
                      description={
                        role.userCount > 0 ? (
                          <span>
                            <span className="font-medium text-foreground">
                              {role.userCount}{" "}
                              {role.userCount === 1 ? "user holds" : "users hold"}
                            </span>{" "}
                            this role. Reassign them first, then come back to
                            delete it.
                          </span>
                        ) : (
                          <span>
                            This permanently removes the{" "}
                            <span className="font-medium text-foreground">
                              {role.name}
                            </span>{" "}
                            role. No users currently hold it, so nothing else
                            changes.
                          </span>
                        )
                      }
                      actionLabel="Delete role"
                      onConfirm={() => handleDelete(role)}
                      disabled={role.userCount > 0}
                      disabledReason={
                        role.userCount > 0
                          ? `Reassign the ${role.userCount} ${role.userCount === 1 ? "user" : "users"} who currently hold this role before deleting it.`
                          : undefined
                      }
                    />
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
