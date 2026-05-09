"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Filter,
  Plus,
  Search,
  Sparkles,
  UserPlus,
  Users as UsersIcon,
} from "lucide-react"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Switch } from "@careline/ui/components/switch"
import { Badge } from "@careline/ui/components/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@careline/ui/components/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@careline/ui/components/table"
import Spinner from "@/components/spinner"
import { cn } from "@careline/ui/lib/utils"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { useUsers } from "@/lib/queries/users"
import { useRoles } from "@/lib/queries/roles"

const ALL_ROLES = "__all__"

export default function UsersListPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [roleId, setRoleId] = useState<string>(ALL_ROLES)
  const [includeInactive, setIncludeInactive] = useState(false)
  const debouncedSearch = useDebouncedValue(search, 250)

  const usersQuery = useUsers({
    name: debouncedSearch || undefined,
    roleId: roleId === ALL_ROLES ? undefined : roleId, // TODO: implement role name filter
    isActive: includeInactive,
  })
  const rolesQuery = useRoles()

  const users = usersQuery.data
  const roles = rolesQuery.data ?? []

  const stats = useMemo(() => {
    if (!users) return { total: 0, active: 0, inactive: 0 }
    const active = users.filter((u) => u.isActive).length
    return { total: users.length, active, inactive: users.length - active }
  }, [users])

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1.5">
          <p className="text-label-md text-muted-foreground">
            Phase 3 · People & access
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Staff directory
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Manage everyone who works at the clinic — receptionists, doctors,
            schedulers, and managers. Patients live separately.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/users/new">
            <UserPlus className="size-4" />
            Add user
          </Link>
        </Button>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Total staff"
          value={stats.total}
          accent="primary"
          icon={<UsersIcon className="size-4" />}
        />
        <StatCard
          label="Active"
          value={stats.active}
          accent="primary"
          icon={<Sparkles className="size-4" />}
        />
        <StatCard
          label="Inactive"
          value={stats.inactive}
          accent="muted"
          icon={<Filter className="size-4" />}
        />
      </section>

      <section className="shadow-ambient rounded-2xl border border-border/70 bg-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="pl-9"
            />
          </div>
          <Select value={roleId} onValueChange={setRoleId}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ALL_ROLES}>All roles</SelectItem>
                {roles
                  .filter((r) => r.name !== "Patient")
                  .map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <label className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <Switch
              checked={includeInactive}
              onCheckedChange={setIncludeInactive}
              aria-label="Show inactive users"
            />
            <span className="whitespace-nowrap text-muted-foreground">
              Show inactive
            </span>
          </label>
        </div>

        {usersQuery.isPending ? (
          <div className="flex items-center justify-center p-16">
            <Spinner />
          </div>
        ) : usersQuery.isError ? (
          <div className="px-6 py-12 text-center text-sm text-destructive">
            Couldn't load users. Check your connection and refresh.
          </div>
        ) : users && users.length === 0 ? (
          <EmptyState
            search={search}
            onCreate={() => router.push("/dashboard/users/new")}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="px-5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Person
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Roles
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Last login
                </TableHead>
                <TableHead className="w-px" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((u) => (
                <TableRow
                  key={u.id}
                  className={cn(
                    "cursor-pointer border-border/40 transition-colors",
                    !u.isActive && "opacity-60"
                  )}
                  onClick={() => router.push(`/dashboard/users/${u.id}`)}
                >
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                        aria-hidden
                      >
                        {initials(u.name)}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {u.roles.length === 0 ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : (
                        u.roles.map((r) => (
                          <Badge
                            key={r.id}
                            variant="outline"
                            className="rounded-full border-primary/25 bg-primary/5 text-primary"
                          >
                            {r.name}
                          </Badge>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {u.isActive ? (
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
                  </TableCell>
                  <TableCell className="py-4 text-sm text-muted-foreground">
                    —
                  </TableCell>
                  <TableCell className="py-4 pr-5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/dashboard/users/${u.id}`)
                      }}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  accent,
  icon,
}: {
  label: string
  value: number
  accent: "primary" | "muted"
  icon: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "shadow-ambient flex items-start justify-between rounded-2xl border p-5",
        accent === "primary"
          ? "border-primary/20 bg-primary/[0.04]"
          : "border-border/60 bg-card"
      )}
    >
      <div>
        <p className="text-label-md text-muted-foreground">{label}</p>
        <p className="mt-2 font-mono text-3xl font-bold tracking-tight tabular-nums">
          {value}
        </p>
      </div>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          accent === "primary"
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </span>
    </div>
  )
}

function EmptyState({
  search,
  onCreate,
}: {
  search: string
  onCreate: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <UsersIcon className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="font-semibold">
          {search ? "No matches" : "No staff yet"}
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {search
            ? "Try a different name or email."
            : "Add your first receptionist or doctor to get started."}
        </p>
      </div>
      {!search ? (
        <Button onClick={onCreate}>
          <Plus className="size-4" />
          Add user
        </Button>
      ) : null}
    </div>
  )
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return (
    (parts[0]?.[0] ?? "").toUpperCase() + (parts[1]?.[0] ?? "").toUpperCase()
  )
}
