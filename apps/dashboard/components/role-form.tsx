"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Tag, FileText } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Label } from "@careline/ui/components/label"
import { Textarea } from "@careline/ui/components/textarea"
import Spinner from "@/components/spinner"
import {
  PermissionMatrix,
  emptyMatrix,
  matrixToPermissions,
  permissionsToMatrix,
  type MatrixValue,
} from "@/components/permission-matrix"
import type { RoleDetail } from "@/lib/api/roles"
import { useCreateRole, useUpdateRole } from "@/lib/queries/roles"
import { extractErrorMessage } from "@/lib/errors"

type Mode = "create" | "edit"

type RoleFormProps = {
  mode: Mode
  initial?: RoleDetail
}

const PROTECTED_NAMES = new Set(["Manager", "Patient"])

export function RoleForm({ mode, initial }: RoleFormProps) {
  const router = useRouter()
  const isProtected =
    mode === "edit" &&
    initial?.isSystem === true &&
    PROTECTED_NAMES.has(initial.name)

  const [name, setName] = useState(initial?.name ?? "")
  const [description, setDescription] = useState(initial?.description ?? "")
  const [matrix, setMatrix] = useState<MatrixValue>(() =>
    initial
      ? permissionsToMatrix(
          (initial?.permissions ?? []).map((p) => ({
            moduleName: p.module.name,
            action: p.action,
          }))
        )
      : emptyMatrix()
  )
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  )

  const createRole = useCreateRole()
  const updateRole = useUpdateRole(initial?.id ?? "")
  const isSubmitting = createRole.isPending || updateRole.isPending

  const grantCount = useMemo(() => {
    let n = 0
    for (const m of Object.keys(matrix)) {
      const row = matrix[m as keyof MatrixValue]
      for (const a of Object.keys(row)) {
        if (row[a as keyof typeof row]) n++
      }
    }
    return n
  }, [matrix])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isProtected) return
    const next: typeof errors = {}

    if (!name.trim()) next.name = "Role name is required."
    else if (name.trim().length < 2) next.name = "At least 2 characters."

    if (!description.trim())
      next.description = "Describe what this role can do."

    setErrors(next)

    if (Object.keys(next).length > 0) return
    try {
      const permissions = matrixToPermissions(matrix)

      if (mode === "create") {
        await createRole.mutateAsync({ name, description, permissions })
        toast.success("Role created", {
          description: `${name} is ready to assign.`,
        })
        router.push("/dashboard/roles")
      } else if (initial) {
        await updateRole.mutateAsync({ name, description, permissions })
        toast.success("Role updated", { description: "Changes saved." })
      }
    } catch (err) {
      toast.error("Save failed", { description: extractErrorMessage(err) })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {isProtected ? (
        <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Lock className="size-4" />
          </span>
          <div className="text-sm">
            <p className="font-semibold text-foreground">
              Protected system role
            </p>
            <p className="text-muted-foreground">
              {initial?.name === "Manager"
                ? "Manager owns the clinic. Its permissions can't be edited or removed."
                : "Patient is reserved for walk-in self check-in. Its permissions can't be edited or removed."}
            </p>
          </div>
        </div>
      ) : null}

      <section className="shadow-ambient rounded-2xl border border-border/70 bg-card p-6">
        <header className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Identity</h2>
            <p className="text-sm text-muted-foreground">
              How this role appears in pickers and badges.
            </p>
          </div>
          <span className="text-label-md text-primary">01</span>
        </header>
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Field
            id="name"
            label="Role name"
            icon={<Tag className="size-4" />}
            error={errors.name}
          >
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Junior Doctor"
              disabled={isProtected}
            />
          </Field>
          <Field
            id="description"
            label="Description"
            icon={<FileText className="size-4" />}
            error={errors.description}
          >
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="One sentence describing what this role is for."
              disabled={isProtected}
              className="min-h-20 resize-none rounded-xl"
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex items-end justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Permission matrix
            </h2>
            <p className="text-sm text-muted-foreground">
              Pick what this role can do, module by module.
            </p>
          </div>
          <span className="text-label-md text-primary">02</span>
        </header>
        <PermissionMatrix
          value={matrix}
          onChange={setMatrix}
          readOnly={isProtected}
          lockReason={
            isProtected
              ? `${initial?.name} is a protected role. Permissions are read-only.`
              : undefined
          }
        />
        <p className="text-xs text-muted-foreground">
          {grantCount} grant{grantCount === 1 ? "" : "s"} configured. A role
          with zero grants is technically valid but won't unlock anything.
        </p>
      </section>

      <div className="shadow-ambient sticky bottom-4 flex justify-end gap-3 rounded-2xl border border-border/70 bg-card/95 p-4 backdrop-blur-sm">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          {isProtected ? "Back" : "Cancel"}
        </Button>
        {!isProtected && (
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner />
            ) : mode === "create" ? (
              "Create role"
            ) : (
              "Save changes"
            )}
          </Button>
        )}
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string
  label: string
  icon?: React.ReactNode
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
      >
        {icon}
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
