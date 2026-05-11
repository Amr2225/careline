"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AtSign, Eye, EyeOff, KeyRound, ShieldCheck, User2 } from "lucide-react"
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
import type { Role } from "@/lib/api/roles"
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

type Mode = "create" | "edit"

type UserFormProps = {
  mode: Mode
  roles: Role[]
  initial?: UserDetail
}

export function UserForm({ mode, roles, initial }: UserFormProps) {
  const router = useRouter()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser(initial?.id ?? "")
  const updateRoles = useUpdateUserRoles(initial?.id ?? "")

  const [showPassword, setShowPassword] = useState(false)

  console.log(initial)

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

  const onSubmit = form.handleSubmit(async (values) => {
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

      // const initialRoles = initial.roles.map((role) => role.name).sort()
      // const nextRoles = [...values.roles].sort()
      // const rolesChanged = initialRoles.join(",") !== nextRoles.join(",")

      if (Object.keys(patch).length > 0) await updateUser.mutateAsync(patch)
      // if (rolesChanged) await updateRoles.mutateAsync(values.roles)

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

  const errors = form.formState.errors

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
                      Inactive accounts are signed out everywhere and cannot log
                      in.
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
