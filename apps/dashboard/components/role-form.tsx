"use client"

import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileText, Lock, Tag } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Textarea } from "@careline/ui/components/textarea"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@careline/ui/components/field"
import Spinner from "@/components/spinner"
import {
  PermissionMatrix,
  emptyMatrix,
  matrixToPermissions,
  permissionsToMatrix,
  type MatrixValue,
} from "@/components/permission-matrix"
import type { RoleItem } from "@/lib/api/roles"
import { useCreateRole, useUpdateRole } from "@/lib/queries/roles"
import { extractErrorMessage } from "@/lib/errors"
import { roleFormSchema, type RoleFormValues } from "@/lib/schemas"
import { Action } from "@careline/shared/types/rbac.type"

type Mode = "create" | "edit"

type RoleFormProps = {
  mode: Mode
  initial?: RoleItem
}

const PROTECTED_NAMES = new Set(["Manager", "Patient"])

function initialMatrix(initial?: RoleItem): MatrixValue {
  if (!initial) return emptyMatrix()

  return permissionsToMatrix(
    (initial.permissions ?? []).map((permission) => ({
      moduleName: permission.module.name,
      action: permission.action,
    }))
  )
}

export function RoleForm({ mode, initial }: RoleFormProps) {
  const router = useRouter()
  const isProtected =
    mode === "edit" &&
    initial?.isSystem === true &&
    PROTECTED_NAMES.has(initial.name)

  const createRole = useCreateRole()
  const updateRole = useUpdateRole(initial?.id ?? "")
  const isSubmitting = createRole.isPending || updateRole.isPending

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: initial?.name ?? "",
      description: initial?.description ?? "",
      permissions: matrixToPermissions(initialMatrix(initial)),
    },
    mode: "onTouched",
  })

  const grantCount = form.watch("permissions").length

  const onSubmit = form.handleSubmit(async (values) => {
    if (isProtected) return

    try {
      if (mode === "create") {
        await createRole.mutateAsync(values)
        toast.success("Role created", {
          description: `${values.name} is ready to assign.`,
        })
        router.push("/dashboard/roles")
      } else if (initial) {
        await updateRole.mutateAsync(values)
        toast.success("Role updated", { description: "Changes saved." })
        form.reset(values)
      }
    } catch (err) {
      toast.error("Save failed", { description: extractErrorMessage(err) })
    }
  })

  const errors = form.formState.errors

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
        </header>
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel
                htmlFor="role-name"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              >
                <Tag className="size-4" />
                Role name
              </FieldLabel>
              <Input
                id="role-name"
                placeholder="Junior Doctor"
                disabled={isProtected}
                aria-invalid={Boolean(errors.name)}
                {...form.register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={Boolean(errors.description)}>
              <FieldLabel
                htmlFor="role-description"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              >
                <FileText className="size-4" />
                Description
              </FieldLabel>
              <Textarea
                id="role-description"
                placeholder="One sentence describing what this role is for."
                disabled={isProtected}
                aria-invalid={Boolean(errors.description)}
                className="min-h-20 resize-none rounded-xl"
                {...form.register("description")}
              />
              <FieldError errors={[errors.description]} />
            </Field>
          </div>
        </FieldGroup>
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
        </header>
        <Controller
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <PermissionMatrix
              value={permissionsToMatrix(stringsToObjects(field.value))}
              onChange={(next) => field.onChange(matrixToPermissions(next))}
              readOnly={isProtected}
              lockReason={
                isProtected
                  ? `${initial?.name} is a protected role. Permissions are read-only.`
                  : undefined
              }
            />
          )}
        />
        <FieldDescription>
          {grantCount} grant{grantCount === 1 ? "" : "s"} configured. A role
          with zero grants is technically valid but won't unlock anything.
        </FieldDescription>
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

function stringsToObjects(permissions: string[]) {
  const out: {
    moduleName: string
    action: Action
  }[] = []
  for (const permission of permissions) {
    const [moduleName, action] = permission.split(":")
    if (!moduleName || !action) continue

    out.push({
      moduleName,
      action: action as Action,
    })
  }
  return out
}
