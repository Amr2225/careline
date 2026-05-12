"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Plus,
  Sparkles,
  UserPlus,
} from "lucide-react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { Button } from "@careline/ui/components/button"
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
import { cn } from "@careline/ui/lib/utils"
import {
  ActiveFilterChips,
  PatientsFilterPopover,
} from "@/components/patients-filter-popover"
import {
  calculateAge,
  formatDate,
  MOCK_PATIENTS,
  // SEX_LABELS,
  // type Patient,
  // type Sex,
} from "@/lib/patients-mock"

import {
  type Gender,
  type Patient,
  GenderLabel,
  ListPatientQuery,
} from "@careline/shared/types/patient.type"
import { usePatients } from "@/lib/queries/patient"

const ALL_GENDERS = "__all__"
const PAGE_SIZE_OPTIONS = [10, 25, 50] as const
const DEFAULT_PAGE_SIZE = 10

const columnHelper = createColumnHelper<Patient>()

export default function PatientsListPage() {
  const router = useRouter()
  const [filters, setFilters] = useState<ListPatientQuery>({})
  const [gender, setGender] = useState<string>(ALL_GENDERS)

  const [showInactive, setShowInactive] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)

  const { data } = usePatients(filters)

  // Substring match on each active filter — all must match (AND across fields,
  // hardcoded — no operator UI). Empty filter values are ignored.
  // const data = useMemo(() => {
  //   return MOCK_PATIENTS.filter((patient) => {
  //     if (!showInactive && !patient.isActive) return false
  //     if (gender !== ALL_GENDERS && patient.sex !== gender) return false

  //     for (const f of filters) {
  //       const query = f.value.trim().toLowerCase()
  //       if (!query) continue

  //       const haystack = (patient[f.field] ?? "").toString().toLowerCase()
  //       if (!haystack.includes(query)) return false
  //     }
  //     return true
  //   })
  // }, [filters, gender, showInactive])

  // Reset to first page when filter inputs change.
  useEffect(() => {
    setPageIndex(0)
  }, [filters, gender, showInactive, pageSize])

  const stats = useMemo(() => {
    const total = MOCK_PATIENTS.length
    const active = MOCK_PATIENTS.filter((p) => p.isActive).length

    const seenThisMonth = MOCK_PATIENTS.filter((p) => {
      if (!p.lastVisitAt) return false
      const d = new Date(p.lastVisitAt)
      const now = new Date()
      return (
        d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
      )
    }).length
    return { total, active, inactive: total - active, seenThisMonth }
  }, [])

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Patient",
        cell: (info) => {
          const patient = info.row.original
          return (
            <div className="flex items-center gap-3">
              <span
                className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                aria-hidden
              >
                {initials(patient.name)}
              </span>
              <div>
                <p className="font-medium text-foreground">{patient.name}</p>
                <p className="text-xs text-muted-foreground">{patient.email}</p>
              </div>
            </div>
          )
        },
      }),
      columnHelper.accessor("phoneNumber", {
        header: "Phone",
        cell: (info) => (
          <span className="font-mono text-sm tabular-nums">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor(
        (patient) => calculateAge(patient.dateOfBirth.toISOString()),
        {
          id: "age",
          header: "Age",
          cell: (info) => {
            const patient = info.row.original

            return (
              <span className="text-sm">
                <span className="font-medium tabular-nums">
                  {info.getValue()}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  {GenderLabel[patient.gender]}
                </span>
              </span>
            )
          },
        }
      ),
      columnHelper.accessor("isActive", {
        header: "Status",
        cell: (info) =>
          info.getValue() ? (
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
          ),
      }),
      columnHelper.accessor((p) => p.createdAt ?? "", {
        // TODO: change to lastVisitAt in phase 5
        id: "lastVisitAt",
        header: "Last visit",
        cell: (info) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(info.row.original.createdAt.toISOString())}
          </span>
        ),
        sortingFn: (a, b) => {
          const av = a.original.createdAt.toDateString() ?? ""
          const bv = b.original.createdAt.toDateString() ?? ""
          return av.localeCompare(bv)
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/dashboard/patients/${row.original.patientId}`)
            }}
          >
            Open
          </Button>
        ),
      }),
    ],
    [router]
  )

  // TODO: implement a better state for this
  if (!data) return null

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater
      setPageIndex(next.pageIndex)
      setPageSize(next.pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const totalRows = data.length
  const totalPages = table.getPageCount() || 1
  const currentPage = pageIndex + 1
  const rangeStart = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const rangeEnd = Math.min(totalRows, (pageIndex + 1) * pageSize)

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Patient directory
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Everyone who books or walks in. Each patient is linked to a User
            account they use to sign into the patient app.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/patients/new">
            <UserPlus className="size-4" />
            Add patient
          </Link>
        </Button>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total patients"
          value={stats.total}
          accent="primary"
          icon={<HeartPulse className="size-4" />}
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
          icon={<Activity className="size-4" />}
        />
        <StatCard
          label="Seen this month"
          value={stats.seenThisMonth}
          accent="muted"
          icon={<CalendarClock className="size-4" />}
        />
      </section>

      <section className="shadow-ambient rounded-2xl border border-border/70 bg-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <PatientsFilterPopover filters={filters} onChange={setFilters} />
              <ActiveFilterChips
                filters={filters}
                onRemove={(idx) =>
                  setFilters(filters.filter((_, i) => i !== idx))
                }
              />
            </div>
            <Select value={sex} onValueChange={setSex}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={ALL_SEX}>All sexes</SelectItem>
                  {(Object.keys(SEX_LABELS) as Gender[]).map((s) => (
                    <SelectItem key={s} value={s}>
                      {Gender[s]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <label className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-sm">
              <Switch
                checked={showInactive}
                onCheckedChange={setShowInactive}
                aria-label="Show inactive patients"
              />
              <span className="whitespace-nowrap text-muted-foreground">
                Show inactive
              </span>
            </label>
          </div>
        </div>

        {totalRows === 0 ? (
          <EmptyState
            hasFilters={filters.length > 0}
            onCreate={() => router.push("/dashboard/patients/new")}
            onClear={() => setFilters([])}
          />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow
                  key={hg.id}
                  className="border-border/60 hover:bg-transparent"
                >
                  {hg.headers.map((header, idx) => {
                    const canSort = header.column.getCanSort()
                    const sortDir = header.column.getIsSorted()
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase",
                          idx === 0 && "px-5",
                          header.column.id === "actions" && "w-px"
                        )}
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <SortIcon dir={sortDir} />
                          </button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "cursor-pointer border-border/40 transition-colors",
                    !row.original.isActive && "opacity-60"
                  )}
                  onClick={() =>
                    router.push(`/dashboard/patients/${row.original.id}`)
                  }
                >
                  {row.getVisibleCells().map((cell, idx) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "py-4",
                        idx === 0 && "px-5",
                        cell.column.id === "actions" && "pr-5"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {totalRows > 0 ? (
          <PaginationBar
            page={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            total={totalRows}
            onPageChange={(p) => table.setPageIndex(p - 1)}
            onPageSizeChange={(s) => table.setPageSize(s)}
          />
        ) : null}
      </section>
    </div>
  )
}

function SortIcon({ dir }: { dir: false | "asc" | "desc" }) {
  if (dir === "asc") return <ArrowUp className="size-3" />
  if (dir === "desc") return <ArrowDown className="size-3" />
  return <ArrowUpDown className="size-3 opacity-40" />
}

function PaginationBar({
  page,
  totalPages,
  pageSize,
  rangeStart,
  rangeEnd,
  total,
  onPageChange,
  onPageSizeChange,
}: {
  page: number
  totalPages: number
  pageSize: number
  rangeStart: number
  rangeEnd: number
  total: number
  onPageChange: (next: number) => void
  onPageSizeChange: (next: number) => void
}) {
  const pageNumbers = buildPageList(page, totalPages)
  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="flex flex-col gap-3 border-t border-border/60 px-5 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-muted-foreground">
        <span>
          Showing{" "}
          <span className="font-mono font-medium text-foreground tabular-nums">
            {rangeStart}–{rangeEnd}
          </span>{" "}
          of{" "}
          <span className="font-mono font-medium text-foreground tabular-nums">
            {total}
          </span>
        </span>
        <span aria-hidden className="text-border">
          •
        </span>
        <label className="flex items-center gap-2">
          <span>Rows</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => onPageSizeChange(Number(v))}
          >
            <SelectTrigger className="h-7 w-[70px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={!canPrev}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1 px-1">
          {pageNumbers.map((item, idx) =>
            item === "…" ? (
              <span
                key={`gap-${idx}`}
                className="px-1.5 text-muted-foreground"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md font-mono text-xs tabular-nums transition-colors",
                  item === page
                    ? "bg-primary/15 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item}
              </button>
            )
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

function buildPageList(page: number, total: number): Array<number | "…"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const out: Array<number | "…"> = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(total - 1, page + 1)
  if (start > 2) out.push("…")
  for (let i = start; i <= end; i++) out.push(i)
  if (end < total - 1) out.push("…")
  out.push(total)
  return out
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
          ? "border-primary/20 bg-primary/4"
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
  hasFilters,
  onCreate,
  onClear,
}: {
  hasFilters: boolean
  onCreate: () => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <HeartPulse className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="font-semibold">
          {hasFilters ? "No matches" : "No patients yet"}
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {hasFilters
            ? "Try removing a filter or broadening the values."
            : "Register the clinic's first patient to start booking and queueing."}
        </p>
      </div>
      {hasFilters ? (
        <Button variant="outline" onClick={onClear}>
          Clear filters
        </Button>
      ) : (
        <Button onClick={onCreate}>
          <Plus className="size-4" />
          Add patient
        </Button>
      )}
    </div>
  )
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return (
    (parts[0]?.[0] ?? "").toUpperCase() + (parts[1]?.[0] ?? "").toUpperCase()
  )
}
