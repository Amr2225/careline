"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AtSign,
  Eye,
  EyeOff,
  KeyRound,
  Link,
  ShieldCheck,
  User2,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Switch } from "@careline/ui/components/switch"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@careline/ui/components/field"
import { RoleMultiSelect } from "@/components/role-multi-select"
import Spinner from "@/components/spinner"
import type { UpdateUserPayload, UserDetail } from "@/lib/api/users"
import {
  useCreateUser,
  useUpdateUser,
  useUpdateUserRoles,
} from "@/lib/queries/users"
import { extractErrorMessage } from "@/lib/errors"
import {
  createUserSchema,
  editUserSchema,
  type UserFormValues,
} from "@/lib/schemas"
import { Skeleton } from "@careline/ui/components/skeleton"
import { useRoles } from "@/lib/queries/roles"

type Mode = "create" | "edit"

type UserFormProps = {
  mode: Mode
  initial?: UserDetail
}

export function UserForm({ mode, initial }: UserFormProps) {
  const router = useRouter()
  const rolesQuery = useRoles()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser(initial?.id ?? "")
  const updateRoles = useUpdateUserRoles(initial?.id ?? "")

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(
      mode === "create" ? createUserSchema : editUserSchema
    ),
    defaultValues: {
      name: initial?.name ?? "",
      email: initial?.email ?? "",
      password: "",
      roles: initial?.roles.map((role) => role.name) ?? [],
      isActive: initial?.isActive ?? true,
    },
    mode: "onTouched",
  })

  const isSubmitting =
    createUser.isPending || updateUser.isPending || updateRoles.isPending

  const watchedEmail = form.watch("email")
  const emailChanged =
    mode === "edit" &&
    initial !== undefined &&
    watchedEmail.toLowerCase() !== initial.email.toLowerCase()
  const errors = form.formState.errors
  const isChangedFields = form.formState.isDirty

  if (rolesQuery.isError && !rolesQuery.data) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-sm text-muted-foreground">Couldn't load roles</p>
        <Button asChild variant="ghost" className="mt-3">
          <Link
            href="/dashboard/roles"
            className="text-sm text-muted-foreground"
          >
            Back to roles
          </Link>
        </Button>
      </div>
    )
  }

  const roles = rolesQuery.data ?? []

  const onSubmit = form.handleSubmit(async (values) => {
    if (!isChangedFields) {
      toast.warning("No changes to save")
      return
    }

    try {
      if (mode === "create") {
        await createUser.mutateAsync({
          name: values.name,
          email: values.email,
          password: values.password,
          roles: values.roles,
        })
        toast.success("User created", {
          description: `${values.name} can now sign in.`,
        })
        router.push("/dashboard/users")
        return
      }

      if (!initial) return
      const patch: UpdateUserPayload = {}
      if (values.name !== initial.name) patch.name = values.name
      if (values.email !== initial.email) patch.email = values.email
      if (values.password.length > 0) patch.password = values.password
      if (values.isActive !== initial.isActive) patch.isActive = values.isActive
      if (values.roles && roles.length > 0) patch.roles = values.roles

      if (Object.keys(patch).length > 0) await updateUser.mutateAsync(patch)

      toast.success("User updated", {
        description: emailChanged
          ? "Sessions revoked due to email change."
          : "Changes saved.",
      })
      form.reset({ ...values, password: "" })
    } catch (err) {
      toast.error("Save failed", { description: extractErrorMessage(err) })
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="shadow-ambient rounded-2xl border border-border/70 bg-card p-6">
        <header className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Identity</h2>
            <p className="text-sm text-muted-foreground">
              How this person signs in.
            </p>
          </div>
        </header>
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel
                htmlFor="user-name"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              >
                <User2 className="size-4" />
                Full name
              </FieldLabel>
              <Input
                id="user-name"
                placeholder="Sarah Smith"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...form.register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel
                htmlFor="user-email"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              >
                <AtSign className="size-4" />
                Email
              </FieldLabel>
              <Input
                id="user-email"
                type="email"
                placeholder="sarah@clinic.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...form.register("email")}
              />
              {errors.email ? (
                <FieldError errors={[errors.email]} />
              ) : emailChanged ? (
                <FieldDescription>
                  Changing email will log this user out everywhere.
                </FieldDescription>
              ) : null}
            </Field>

            <Field
              className="sm:col-span-2"
              data-invalid={Boolean(errors.password)}
            >
              <FieldLabel
                htmlFor="user-password"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              >
                <KeyRound className="size-4" />
                {mode === "create" ? "Password" : "New password"}
              </FieldLabel>
              <div className="relative">
                <Input
                  id="user-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "create" ? "••••••••" : "Unchanged"}
                  autoComplete="new-password"
                  className="pr-10"
                  aria-invalid={Boolean(errors.password)}
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <FieldError errors={[errors.password]} />
              ) : (
                <FieldDescription>
                  {mode === "edit"
                    ? "Leave blank to keep current password."
                    : "Min 8 characters with at least one digit."}
                </FieldDescription>
              )}
            </Field>
          </div>
        </FieldGroup>
      </section>

      <section className="shadow-ambient rounded-2xl border border-border/70 bg-card p-6">
        <header className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Access</h2>
            <p className="text-sm text-muted-foreground">
              Roles determine what this person can do across the clinic.
            </p>
          </div>
        </header>
        {rolesQuery.isPending && !rolesQuery.data ? (
          <RolesSkeleton />
        ) : (
          <FieldGroup>
            <Field data-invalid={Boolean(errors.roles)}>
              <FieldLabel
                htmlFor="user-roles"
                className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              >
                <ShieldCheck className="size-4" />
                Assigned roles
              </FieldLabel>
              <Controller
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <RoleMultiSelect
                    roles={roles}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pick one or more staff roles"
                  />
                )}
              />
              <FieldError errors={[errors.roles]} />
            </Field>

            {mode === "edit" ? (
              <Controller
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <Field
                    orientation="horizontal"
                    className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">Account active</p>
                      <FieldDescription>
                        Inactive accounts are signed out everywhere and cannot
                        log in.
                      </FieldDescription>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Account active"
                    />
                  </Field>
                )}
              />
            ) : null}
          </FieldGroup>
        )}
      </section>

      <div className="shadow-ambient sticky bottom-4 flex justify-end gap-3 rounded-2xl border border-border/70 bg-card/95 p-4 backdrop-blur-sm">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner />
          ) : mode === "create" ? (
            "Create user"
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </form>
  )
}

function RolesSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Skeleton className="size-4 rounded" />
        <Skeleton className="h-3 w-28" />
      </div>
      <div className="flex min-h-14 items-center justify-between rounded-xl border border-border/70 bg-background px-4 py-2">
        <div className="flex items-center rounded-full border border-border/70 bg-muted/30 px-3 py-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="ml-2 size-3 rounded-full" />
        </div>
        <Skeleton className="size-4 rounded" />
      </div>
    </div>
  )
}
