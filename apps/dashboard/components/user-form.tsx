"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AtSign, KeyRound, ShieldCheck, User2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Label } from "@careline/ui/components/label"
import { Switch } from "@careline/ui/components/switch"
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

type Mode = "create" | "edit"

type UserFormProps = {
  mode: Mode
  roles: Role[]
  initial?: UserDetail
}

type FieldErrors = Partial<{
  name: string
  email: string
  password: string
  roleIds: string
}>

function validate(payload: {
  name: string
  email: string
  password: string
  roleIds: string[]
  mode: Mode
}): FieldErrors {
  const errors: FieldErrors = {}
  if (!payload.name.trim()) errors.name = "Name is required."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
    errors.email = "Enter a valid email."
  if (payload.mode === "create" || payload.password.length > 0) {
    if (payload.password.length < 8)
      errors.password = "Password must be at least 8 characters."
    else if (!/\d/.test(payload.password))
      errors.password = "Include at least one digit."
  }
  if (payload.mode === "create" && payload.roleIds.length === 0)
    errors.roleIds = "Assign at least one role."
  return errors
}

export function UserForm({ mode, roles, initial }: UserFormProps) {
  const router = useRouter()
  const [name, setName] = useState(initial?.name ?? "")
  const [email, setEmail] = useState(initial?.email ?? "")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isActive, setIsActive] = useState(initial?.isActive ?? true)
  const [roleIds, setRoleIds] = useState<string[]>(
    initial?.roles.map((r) => r.id) ?? []
  )
  const [errors, setErrors] = useState<FieldErrors>({})

  const createUser = useCreateUser()
  const updateUser = useUpdateUser(initial?.id ?? "")
  const updateRoles = useUpdateUserRoles(initial?.id ?? "")

  const isSubmitting =
    createUser.isPending || updateUser.isPending || updateRoles.isPending

  const emailChanged =
    mode === "edit" &&
    initial?.email !== undefined &&
    email.toLowerCase() !== initial.email.toLowerCase()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate({ name, email, password, roleIds, mode })
    setErrors(v)
    if (Object.keys(v).length > 0) return

    try {
      if (mode === "create") {
        await createUser.mutateAsync({ name, email, password, roleIds })
        toast.success("User created", {
          description: `${name} can now sign in.`,
        })
        router.push("/dashboard/users")
      } else if (initial) {
        const patch: UpdateUserPayload = {}
        if (name !== initial.name) patch.name = name
        if (email !== initial.email) patch.email = email
        if (password.length > 0) patch.password = password
        if (isActive !== initial.isActive) patch.isActive = isActive

        const initialRoleIds = initial.roles.map((r) => r.id).sort()
        const nextRoleIds = [...roleIds].sort()
        const rolesChanged = initialRoleIds.join(",") !== nextRoleIds.join(",")

        if (Object.keys(patch).length > 0) {
          await updateUser.mutateAsync(patch)
        }
        if (rolesChanged) {
          await updateRoles.mutateAsync(roleIds)
        }
        toast.success("User updated", {
          description: emailChanged
            ? "Sessions revoked due to email change."
            : "Changes saved.",
        })
      }
    } catch (err) {
      toast.error("Save failed", { description: extractErrorMessage(err) })
    }
  }

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
          <span className="text-label-md text-primary">01</span>
        </header>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label="Full name"
            icon={<User2 className="size-4" />}
            error={errors.name}
          >
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah Smith"
              autoComplete="name"
            />
          </Field>
          <Field
            id="email"
            label="Email"
            icon={<AtSign className="size-4" />}
            error={errors.email}
            hint={
              emailChanged
                ? "Changing email will log this user out everywhere."
                : undefined
            }
          >
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@clinic.com"
              autoComplete="email"
            />
          </Field>
          <Field
            id="password"
            label={mode === "create" ? "Password" : "New password"}
            icon={<KeyRound className="size-4" />}
            error={errors.password}
            hint={
              mode === "edit"
                ? "Leave blank to keep current password."
                : "Min 8 characters with at least one digit."
            }
            className="sm:col-span-2"
          >
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "create" ? "••••••••" : "Unchanged"}
                autoComplete="new-password"
                className="pr-10"
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
          </Field>
        </div>
      </section>

      <section className="shadow-ambient rounded-2xl border border-border/70 bg-card p-6">
        <header className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Access</h2>
            <p className="text-sm text-muted-foreground">
              Roles determine what this person can do across the clinic.
            </p>
          </div>
          <span className="text-label-md text-primary">02</span>
        </header>
        <Field
          id="roles"
          label="Assigned roles"
          icon={<ShieldCheck className="size-4" />}
          error={errors.roleIds}
        >
          <RoleMultiSelect
            roles={roles}
            value={roleIds}
            onChange={setRoleIds}
            placeholder="Pick one or more staff roles"
          />
        </Field>
        {mode === "edit" ? (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Account active</p>
              <p className="text-xs text-muted-foreground">
                Inactive accounts are signed out everywhere and cannot log in.
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              aria-label="Account active"
            />
          </div>
        ) : null}
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

function Field({
  id,
  label,
  icon,
  error,
  hint,
  children,
  className,
}: {
  id: string
  label: string
  icon?: React.ReactNode
  error?: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={"flex flex-col gap-1.5 " + (className ?? "")}>
      <Label
        htmlFor={id}
        className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
      >
        {icon}
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
