"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AtSign,
  Check,
  ChevronLeft,
  Link2,
  Phone,
  Search,
  UserPlus,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { cn } from "@careline/ui/lib/utils"
import { PatientForm } from "@/components/patient-form"
import { useUsersWithPatientRole } from "@/lib/queries/patient"
import { UserWithoutPassword } from "@careline/shared/types/user.type"
import { initials } from "@/lib/initials"
import Spinner from "@/components/spinner"

type FlowMode = "create" | "link"

export default function NewPatientPage() {
  const [mode, setMode] = useState<FlowMode>("create")
  const [selectedUser, setSelectedUser] = useState<UserWithoutPassword | null>(
    null
  )
  const [search, setSearch] = useState("")
  const { data, isPending, isError } = useUsersWithPatientRole({ search })
  const usersWithPatientRole = data ?? []

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/patients">
            <ChevronLeft className="size-4" />
            Back to patients
          </Link>
        </Button>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">New patient</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Either register a brand new person, or link an existing User account
          that doesn't have a patient profile yet.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="shadow-ambient grid grid-cols-1 gap-3 rounded-2xl border border-border/70 bg-card p-3 sm:grid-cols-2">
        <ModeCard
          active={mode === "create"}
          onClick={() => {
            setMode("create")
            setSelectedUser(null)
          }}
          icon={<UserPlus className="size-4" />}
          title="Create new user"
          description="Make a brand new User account and patient profile in one step."
        />
        <ModeCard
          active={mode === "link"}
          onClick={() => setMode("link")}
          icon={<Link2 className="size-4" />}
          title="Link existing user"
          description="Attach a patient profile to a User account that already exists."
        />
      </div>

      {mode === "create" ? (
        <PatientForm
          mode="create"
          scope={{ canEditContact: true, canEditMedicalNotes: false }}
        />
      ) : selectedUser ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Linking{" "}
              <span className="font-medium text-foreground">
                {selectedUser.name}
              </span>{" "}
              — fill in intake details below.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedUser(null)}
            >
              Pick a different user
            </Button>
          </div>
          <PatientForm
            mode="link"
            scope={{ canEditContact: true, canEditMedicalNotes: false }}
            linkedUser={selectedUser}
          />
        </div>
      ) : (
        <UserPicker
          users={usersWithPatientRole}
          search={search}
          onSearchChange={setSearch}
          onSelect={setSelectedUser}
          isPending={isPending}
          isError={isError}
        />
      )}
    </div>
  )
}

function ModeCard({
  active,
  onClick,
  icon,
  title,
  description,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
        active
          ? "border-primary/40 bg-primary/5 ring-2 ring-primary/20"
          : "border-border/60 bg-card hover:border-border hover:bg-muted/40"
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          active
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground group-hover:bg-muted/60"
        )}
      >
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold tracking-tight">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      {active ? (
        <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </span>
      ) : null}
    </button>
  )
}

function UserPicker({
  users,
  search,
  onSearchChange,
  onSelect,
  isPending,
  isError,
}: {
  users: UserWithoutPassword[]
  search: string
  onSearchChange: (value: string) => void
  onSelect: (user: UserWithoutPassword) => void
  isPending: boolean
  isError: boolean
}) {
  return (
    <section className="shadow-ambient rounded-2xl border border-border/70 bg-card">
      <div className="border-b border-border/60 p-4">
        <h2 className="text-base font-semibold tracking-tight">
          Find an existing user
        </h2>
        <p className="text-sm text-muted-foreground">
          Only User accounts without a patient profile are eligible.
        </p>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, or phone…"
            className="pl-9"
          />
        </div>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center p-16">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="px-6 py-12 text-center text-sm text-destructive">
          Couldn't load users. Check your connection and refresh.
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Search className="size-4" />
          </span>
          <p className="text-sm font-medium">No matching users</p>
          <p className="max-w-xs text-xs text-muted-foreground">
            Try a different search, or switch to "Create new user" to add this
            person from scratch.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border/50">
          {users.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                onClick={() => onSelect(user)}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-muted/40"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  aria-hidden
                >
                  {initials(user.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <AtSign className="size-3" />
                      {user.email}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Phone className="size-3" />
                      {user.phone ?? "no phone"}
                    </span>
                  </p>
                </div>
                <span className="text-xs font-medium text-primary">Link →</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
