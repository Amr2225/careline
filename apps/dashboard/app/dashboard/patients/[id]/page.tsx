"use client"

import { use, useState } from "react"
import Link from "next/link"
import {
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  History,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@careline/ui/components/button"
import { Badge } from "@careline/ui/components/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@careline/ui/components/select"
import { PatientForm, type PatientScope } from "@/components/patient-form"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { calculateAge, formatDate } from "@/lib/patients-mock"
import { usePatient } from "@/lib/queries/patient"
import {
  BloodTypeLabel,
  GenderLabel,
} from "@careline/shared/types/patient.type"
import Loading from "@/components/loading"

type ScopePreset = "manager" | "receptionist" | "doctor" | "scheduler"

const SCOPES: Record<ScopePreset, PatientScope & { label: string }> = {
  manager: {
    label: "Manager (all)",
    canEditContact: true,
    canEditMedicalNotes: true,
  },
  receptionist: {
    label: "Receptionist (contact only)",
    canEditContact: true,
    canEditMedicalNotes: false,
  },
  doctor: {
    label: "Doctor (medical notes only)",
    canEditContact: false,
    canEditMedicalNotes: true,
  },
  scheduler: {
    label: "Scheduler (read-only)",
    canEditContact: false,
    canEditMedicalNotes: false,
  },
}

// export const calculateScop = (
//   requiredPermissions: string[],
//   userPermissions: string[]
// ): ScopePreset => {

//   return "doctor"
// }

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const patientQuery = usePatient(id)

  const [scopePreset, setScopePreset] = useState<ScopePreset>("manager")
  const [isActive, setIsActive] = useState(true)

  if (patientQuery.isPending && !patientQuery.data) return <Loading />
  if (patientQuery.isError && !patientQuery.data) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-sm text-muted-foreground">Patient not found.</p>
        <Button asChild variant="ghost" className="mt-3">
          <Link href="/dashboard/patients">Back to patients</Link>
        </Button>
      </div>
    )
  }

  const patient = patientQuery.data
  const scope = SCOPES[scopePreset]
  const age = calculateAge(patient.dateOfBirth)

  const handleDeactivate = async () => {
    await new Promise((r) => setTimeout(r, 400))
    setIsActive(false)
    toast.success("Patient deactivated", {
      description: "Sessions revoked. Reactivate any time.",
    })
  }

  const handleReactivate = async () => {
    await new Promise((r) => setTimeout(r, 400))
    setIsActive(true)
    toast.success("Patient reactivated", {
      description: "They can log in again.",
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Button variant="ghost" className="p-0" size="sm" asChild>
          <Link href="/dashboard/patients">
            <ChevronLeft className="size-4" />
            Back to patients
          </Link>
        </Button>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary"
              aria-hidden
            >
              {initials(patient.name)}
            </span>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {patient.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="tabular-nums">
                  {age} yrs · {GenderLabel[patient.gender]}
                </span>
                {patient.bloodType ? (
                  <>
                    <span aria-hidden>·</span>
                    <Badge
                      variant="outline"
                      className="rounded-full border-destructive/30 bg-destructive/5 text-destructive"
                    >
                      {BloodTypeLabel[patient.bloodType]}
                    </Badge>
                  </>
                ) : null}
                {isActive ? (
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
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            {/* Scope picker — mock-only, simulates which role is viewing */}
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/30 px-3 py-2">
              <ShieldCheck className="size-4 text-muted-foreground" />
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                View as
              </span>
              <Select
                value={scopePreset}
                onValueChange={(v) => setScopePreset(v as ScopePreset)}
              >
                <SelectTrigger className="h-8 w-[210px] border-0 bg-transparent shadow-none focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SCOPES) as ScopePreset[]).map((k) => (
                    <SelectItem key={k} value={k}>
                      {SCOPES[k].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isActive ? (
              <ConfirmDialog
                trigger={
                  <Button
                    variant="destructive"
                    size="lg"
                    disabled={!scope.canEditContact}
                  >
                    <Trash2 className="size-4" />
                    Deactivate
                  </Button>
                }
                title="Deactivate this patient?"
                description={
                  <span>
                    This will sign{" "}
                    <span className="font-medium text-foreground">
                      {patient.name}
                    </span>{" "}
                    out of every device, prevent login, and hide them from
                    default lists. Their appointments and visit history are
                    preserved.
                  </span>
                }
                actionLabel="Deactivate"
                onConfirm={handleDeactivate}
              />
            ) : (
              <Button
                size="lg"
                variant="secondary"
                onClick={handleReactivate}
                disabled={!scope.canEditContact}
              >
                <RotateCcw className="size-4" />
                Reactivate
              </Button>
            )}
          </div>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryItem
          icon={<Phone className="size-4" />}
          label="Phone"
          value={patient.phoneNumber}
          mono
        />
        <SummaryItem
          icon={<Mail className="size-4" />}
          label="Email"
          value={patient.email}
        />
        <SummaryItem
          icon={<CalendarDays className="size-4" />}
          label="Date of birth"
          value={formatDate(patient.dateOfBirth)}
        />
        <SummaryItem
          icon={<MapPin className="size-4" />}
          label="Address"
          value={patient.address ?? "—"}
        />
      </section>

      {/* At-a-glance medical chips */}
      {patient.allergies || patient.chronicConditions ? (
        <section className="shadow-ambient rounded-2xl border border-amber-500/30 bg-amber-500/4 p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="size-4" />
            </span>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold tracking-tight">
                Clinical flags
              </p>
              <div className="flex flex-wrap gap-2">
                {patient.allergies ? (
                  <Badge
                    variant="outline"
                    className="rounded-full border-destructive/30 bg-destructive/5 text-destructive"
                  >
                    Allergies: {patient.allergies}
                  </Badge>
                ) : null}
                {patient.chronicConditions ? (
                  <Badge
                    variant="outline"
                    className="rounded-full border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300"
                  >
                    Chronic: {patient.chronicConditions}
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <PatientForm
        mode="edit"
        scope={scope}
        initial={{ ...patient, isActive }}
        patientId={id}
      />

      <PlaceholderSection
        icon={<CalendarClock className="size-4" />}
        title="Appointments"
        subtitle="Coming in Phase 5"
        description="Once Phase 5 lands, you'll see this patient's upcoming and past bookings here, with rebooking and cancel actions."
      />

      <PlaceholderSection
        icon={<History className="size-4" />}
        title="Visit history"
        subtitle="Coming in Phase 6"
        description="Walk-in queue tickets and completed visits will surface here once the queue module is wired up."
      />
    </div>
  )
}

function SummaryItem({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="shadow-ambient flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-label-md text-muted-foreground">{label}</p>
        <p
          className={
            "mt-0.5 truncate text-sm font-medium " + (mono ? "font-mono" : "")
          }
          title={value}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

function PlaceholderSection({
  icon,
  title,
  subtitle,
  description,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
}) {
  return (
    <section className="shadow-ambient rounded-2xl border border-dashed border-border/70 bg-muted/20 p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          {icon}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
            <Badge
              variant="outline"
              className="rounded-full border-border/70 bg-background text-xs text-muted-foreground"
            >
              <Stethoscope className="size-3" />
              {subtitle}
            </Badge>
          </div>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return (
    (parts[0]?.[0] ?? "").toUpperCase() + (parts[1]?.[0] ?? "").toUpperCase()
  )
}
