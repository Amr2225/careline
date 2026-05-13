"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AtSign,
  CalendarDays,
  Droplet,
  Eye,
  EyeOff,
  Heart,
  KeyRound,
  Lock,
  MapPin,
  Phone,
  Pill,
  ShieldAlert,
  Stethoscope,
  User2,
  Users as UsersIcon,
} from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@careline/ui/components/button"
import { Input } from "@careline/ui/components/input"
import { Textarea } from "@careline/ui/components/textarea"
import { Switch } from "@careline/ui/components/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@careline/ui/components/select"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@careline/ui/components/field"
import Spinner from "@/components/spinner"
import { PhoneInput } from "@/components/phone-input"
import {
  BloodTypeLabel,
  GenderLabel,
  Patient,
} from "@careline/shared/types/patient.type"
import {
  BloodType,
  Gender,
  // GenderConst,
} from "@careline/shared/types/patient.type"
import {
  useCreatePatient,
  useCreatePatientWithUser,
  useUpdatePatient,
} from "@/lib/queries/patient"
import { extractErrorMessage } from "@/lib/errors"
import { UserWithoutPassword } from "@careline/shared/types/user.type"
import { useUpdateUser } from "@/lib/queries/users"

type Mode = "create" | "edit" | "link"

export type PatientScope = {
  canEditContact: boolean
  canEditMedicalNotes: boolean
}

type PatientFormProps = {
  mode: Mode
  scope: PatientScope // TODO: will be deleted
  initial?: Patient
  linkedUser?: UserWithoutPassword
  patientId?: string
}

const phoneRegex = /^\+\d{1,3}\s?\d[\d\s-]{6,}$/

const baseSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.email("Enter a valid email").trim(),
  phoneNumber: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid phone number.")
    .transform((value) => value.replace(/\s/g, "")),
  dateOfBirth: z.string().min(1, "Date of birth is required."),
  gender: z.enum(Gender),
  address: z.string().trim().optional().or(z.literal("")),
  emergencyContactName: z.string().trim().optional().or(z.literal("")),
  emergencyContactPhone: z
    .string()
    .trim()
    .transform((value) => (value ? value.replace(/\s/g, "") : ""))
    .optional()
    .or(z.literal("")),
  bloodType: z.enum(BloodType).optional(),
  allergies: z.string().trim().optional().or(z.literal("")),
  chronicConditions: z.string().trim().optional().or(z.literal("")),
  currentMedications: z.string().trim().optional().or(z.literal("")),
  medicalNotes: z.string().trim().optional().or(z.literal("")),
  isActive: z.boolean().optional(),
})

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/\d/, "Include at least one digit.")

const createSchema = baseSchema.extend({
  password: passwordSchema,
  // userId: z.string().min(1, "User ID is required"),
})
const editSchema = baseSchema.extend({
  password: z.union([z.literal(""), passwordSchema]),
})

// Link mode: identity comes from the existing User, so name/email/phone/password
// are not user-editable here.
const linkSchema = baseSchema
  .omit({ name: true, email: true, phoneNumber: true })
  .extend({
    password: z.literal("").optional(),
    userId: z.string().min(1, "User ID is required"),
  })

type CreateSchemaType = z.infer<typeof createSchema>
type LinkSchemaType = z.infer<typeof linkSchema>
type EditSchemaType = z.infer<typeof editSchema>

const unionSchema = z.union([createSchema, linkSchema, editSchema])
type ResolverSchemaType = z.infer<typeof unionSchema>

export function PatientForm({
  mode,
  scope,
  initial,
  linkedUser,
  patientId,
}: PatientFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const createPatientWithUser = useCreatePatientWithUser()
  const updateUser = useUpdateUser(initial?.userId ?? "")
  const createPatient = useCreatePatient()
  const updatePatient = useUpdatePatient(patientId ?? "")

  const resolverSchema =
    mode === "create" ? createSchema : mode === "link" ? linkSchema : editSchema

  const form = useForm<ResolverSchemaType>({
    resolver: zodResolver(resolverSchema),
    shouldUnregister: true,
    defaultValues: {
      // userId: linkedUser?.id ?? "",
      name: linkedUser?.name ?? initial?.name ?? "",
      email: linkedUser?.email ?? initial?.email ?? "",
      phoneNumber: linkedUser?.phoneNumber ?? initial?.phoneNumber ?? "+20 ",
      password: "",
      dateOfBirth: initial?.dateOfBirth ?? "",
      gender: initial?.gender ?? Gender.MALE,
      address: initial?.address ?? "",
      emergencyContactName: initial?.emergencyContactName ?? "",
      emergencyContactPhone: initial?.emergencyContactPhone ?? "",
      bloodType: initial?.bloodType ?? BloodType.UNKNOWN,
      allergies: initial?.allergies ?? "",
      chronicConditions: initial?.chronicConditions ?? "",
      currentMedications: initial?.currentMedications ?? "",
      medicalNotes: initial?.medicalNotes ?? "",
      isActive: initial?.isActive ?? true,
    },
    mode: "onTouched",
  })

  const isSubmitting =
    createPatientWithUser.isPending ||
    createPatient.isPending ||
    updatePatient.isPending

  const errors = form.formState.errors as FieldErrors<CreateSchemaType>
  const changedFields = form.formState.dirtyFields as Partial<CreateSchemaType>
  const contactDisabled = !scope.canEditContact
  const medicalNotesDisabled = !scope.canEditMedicalNotes
  const readOnlyEverything = contactDisabled && medicalNotesDisabled

  useEffect(() => {
    form.setValue("userId", linkedUser?.id ?? "")
  }, [linkedUser])

  const onSubmit = form.handleSubmit(async (values) => {
    if (mode === "create") {
      try {
        const createPayload = values as CreateSchemaType
        createPayload.phoneNumber = createPayload.phoneNumber //remove spaces from phone number
        createPayload.emergencyContactPhone =
          createPayload.emergencyContactPhone?.replace(/\s/g, "") //remove spaces from emergency contact phone number
        await createPatientWithUser.mutateAsync(createPayload)

        toast.success("Patient created", {
          description: `${createPayload.name} can now sign into the patient app.`,
        })
        router.push("/dashboard/patients")
        return
      } catch (error) {
        toast.error("Patient creation failed", {
          description: extractErrorMessage(error),
        })
      }
    }

    if (mode === "link") {
      try {
        await createPatient.mutateAsync(values as LinkSchemaType)
        toast.success("Patient profile linked", {
          description: `${linkedUser?.name ?? "User"} now has a patient record.`,
        })
        router.push("/dashboard/patients")
        return
      } catch (error) {
        toast.error("Patient creation failed", {
          description: extractErrorMessage(error),
        })
      }
    }

    if (mode === "edit") {
      try {
        const editValues = values as EditSchemaType

        const updatedValues = Object.fromEntries(
          (Object.keys(editValues) as Array<keyof EditSchemaType>)
            .filter((key) => changedFields[key])
            .map((key) => [key, editValues[key]])
        ) as Partial<EditSchemaType>

        type userFields = "name" | "email" | "phoneNumber" | "password"

        const userUpdatePayload: Record<userFields, string | undefined> = {
          name: updatedValues?.name,
          email: updatedValues?.email,
          phoneNumber: updatedValues?.phoneNumber,
          password: updatedValues?.password,
        }

        const patientUpdatePayload = Object.fromEntries(
          (Object.keys(editValues) as Array<keyof EditSchemaType>)
            .filter(
              (key) =>
                !Object.keys(userUpdatePayload).includes(key) &&
                changedFields[key]
            )
            .map((key) => [key, editValues[key]])
        ) as Partial<EditSchemaType>

        const userValuesChanged = Object.values(userUpdatePayload).some(
          (value) => value !== undefined && value !== null && value !== ""
        )

        const patientValuesChanged = Object.values(patientUpdatePayload).some(
          (value) => value !== undefined && value !== null && value !== ""
        )

        console.log("Values: ", values)
        console.log("Updated Values", updatedValues)
        console.log("Changed Fields", changedFields)
        console.log("userUpdatePayload", userUpdatePayload)
        console.log("patientUpdatePayload", patientUpdatePayload)

        console.log("userValuesChanged", userValuesChanged)
        console.log("patientValuesChange", patientValuesChanged)

        if (userValuesChanged) await updateUser.mutateAsync(userUpdatePayload)
        if (patientValuesChanged) await updatePatient.mutateAsync(updatedValues)
        toast.success("Patient updated", { description: "Changes saved." })
      } catch (error) {
        toast.error("Patient update failed", {
          description: extractErrorMessage(error),
        })
      }
    }
    form.reset({ ...values, password: "" })
  })

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {readOnlyEverything ? (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-900 dark:text-amber-200">
          <Lock className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Read-only access</p>
            <p className="text-amber-900/80 dark:text-amber-200/80">
              You can view this patient, but you don't have permission to edit
              any fields. Ask a Manager to grant Patients:UPDATE access.
            </p>
          </div>
        </div>
      ) : null}

      {mode === "edit" && contactDisabled && !medicalNotesDisabled ? (
        <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm text-primary">
          <Stethoscope className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Doctor scope</p>
            <p className="text-primary/80">
              Only clinical notes are editable. Contact and intake fields are
              maintained by reception.
            </p>
          </div>
        </div>
      ) : null}

      {mode === "link" && linkedUser ? (
        <section className="shadow-ambient rounded-2xl border border-primary/25 bg-primary/4 p-6">
          <header className="mb-4 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <User2 className="size-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Linked user
              </h2>
              <p className="text-sm text-muted-foreground">
                Identity comes from this existing account. Edit it in the Users
                module if anything looks wrong.
              </p>
            </div>
          </header>
          <div className="grid gap-3 sm:grid-cols-3">
            <ReadOnlyField
              icon={<User2 className="size-4" />}
              label="Name"
              value={linkedUser.name}
            />
            <ReadOnlyField
              icon={<AtSign className="size-4" />}
              label="Email"
              value={linkedUser.email}
            />
            <ReadOnlyField
              icon={<Phone className="size-4" />}
              label="Phone"
              value={linkedUser.phoneNumber ?? "—"}
              mono
            />
          </div>
        </section>
      ) : null}

      {/* Identity — hidden in link mode (uses existing User) */}
      {mode !== "link" ? (
        <FormSection
          title="Identity"
          description="The User account linked to this patient."
          icon={<User2 className="size-4" />}
        >
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field data-invalid={Boolean(errors.name)}>
                <FieldLabel htmlFor="p-name" className={labelClass}>
                  <User2 className="size-4" />
                  Full name
                </FieldLabel>
                <Input
                  id="p-name"
                  placeholder="Ahmed Hassan"
                  disabled={contactDisabled}
                  aria-invalid={Boolean(errors.name)}
                  {...form.register("name")}
                />
                <FieldError errors={[errors.name]} />
              </Field>

              <Field data-invalid={Boolean(errors.email)}>
                <FieldLabel htmlFor="p-email" className={labelClass}>
                  <AtSign className="size-4" />
                  Email
                </FieldLabel>
                <Input
                  id="p-email"
                  type="email"
                  placeholder="ahmed@example.com"
                  disabled={contactDisabled}
                  aria-invalid={Boolean(errors.email)}
                  {...form.register("email")}
                />
                <FieldError errors={[errors.email]} />
              </Field>

              <Field data-invalid={Boolean(errors.phoneNumber)}>
                <FieldLabel htmlFor="p-phone" className={labelClass}>
                  <Phone className="size-4" />
                  Phone
                </FieldLabel>
                <Controller
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <PhoneInput
                      id="p-phone"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      disabled={contactDisabled}
                      invalid={Boolean(errors.phoneNumber)}
                    />
                  )}
                />
                {errors.phoneNumber ? (
                  <FieldError errors={[errors.phoneNumber]} />
                ) : (
                  <FieldDescription>
                    Used for patient login and queue identification.
                  </FieldDescription>
                )}
              </Field>

              <Field data-invalid={Boolean(errors.password)}>
                <FieldLabel htmlFor="p-password" className={labelClass}>
                  <KeyRound className="size-4" />
                  {mode === "create" ? "Starter password" : "New password"}
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="p-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "create" ? "••••••••" : "Unchanged"}
                    autoComplete="new-password"
                    disabled={contactDisabled}
                    className="pr-10"
                    aria-invalid={Boolean(errors.password)}
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
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
                      : "Share with the patient so they can log into the app."}
                  </FieldDescription>
                )}
              </Field>
            </div>
          </FieldGroup>
        </FormSection>
      ) : null}

      {/* Profile */}
      <FormSection
        title="Profile"
        description="Basic demographics and contact info."
        icon={<CalendarDays className="size-4" />}
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={Boolean(errors.dateOfBirth)}>
              <FieldLabel htmlFor="p-dob" className={labelClass}>
                <CalendarDays className="size-4" />
                Date of birth
              </FieldLabel>
              <Input
                id="p-dob"
                type="date"
                disabled={contactDisabled}
                aria-invalid={Boolean(errors.dateOfBirth)}
                {...form.register("dateOfBirth")}
              />
              <FieldError errors={[errors.dateOfBirth]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="p-gender" className={labelClass}>
                <UsersIcon className="size-4" />
                Gender
              </FieldLabel>
              <Controller
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={contactDisabled}
                  >
                    <SelectTrigger id="p-gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Gender).map((value) => (
                        <SelectItem key={value} value={value}>
                          {GenderLabel[value]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="p-address" className={labelClass}>
                <MapPin className="size-4" />
                Address
              </FieldLabel>
              <Input
                id="p-address"
                placeholder="Street, city"
                disabled={contactDisabled}
                {...form.register("address")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="p-emergency-name" className={labelClass}>
                <ShieldAlert className="size-4" />
                Emergency contact
              </FieldLabel>
              <Input
                id="p-emergency-name"
                placeholder="Name"
                disabled={contactDisabled}
                {...form.register("emergencyContactName")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="p-emergency-phone" className={labelClass}>
                <Phone className="size-4" />
                Emergency phone
              </FieldLabel>
              <Controller
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <PhoneInput
                    id="p-emergency-phone"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    disabled={contactDisabled}
                  />
                )}
              />
            </Field>
          </div>
        </FieldGroup>
      </FormSection>

      {/* Medical intake */}
      <FormSection
        title="Medical intake"
        description="History and allergies — captured by reception or doctor."
        icon={<Heart className="size-4" />}
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="p-blood" className={labelClass}>
                <Droplet className="size-4" />
                Blood type
              </FieldLabel>
              <Controller
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <Select
                    value={field.value ?? "UNKNOWN"}
                    onValueChange={(v) => field.onChange(v as BloodType)}
                    disabled={contactDisabled}
                  >
                    <SelectTrigger id="p-blood">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BloodType).map((value) => (
                        <SelectItem key={value} value={value}>
                          {BloodTypeLabel[value]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="p-allergies" className={labelClass}>
                <ShieldAlert className="size-4" />
                Allergies
              </FieldLabel>
              <Input
                id="p-allergies"
                placeholder="None known"
                disabled={contactDisabled}
                {...form.register("allergies")}
              />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="p-chronic" className={labelClass}>
                <Heart className="size-4" />
                Chronic conditions
              </FieldLabel>
              <Textarea
                id="p-chronic"
                rows={2}
                placeholder="Hypertension, diabetes, asthma…"
                disabled={contactDisabled}
                {...form.register("chronicConditions")}
              />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="p-meds" className={labelClass}>
                <Pill className="size-4" />
                Current medications
              </FieldLabel>
              <Textarea
                id="p-meds"
                rows={2}
                placeholder="Drug, dose, frequency…"
                disabled={contactDisabled}
                {...form.register("currentMedications")}
              />
            </Field>
          </div>
        </FieldGroup>
      </FormSection>

      {/* Clinical notes — gated behind UPDATE_MEDICAL */}
      {mode === "edit" ? (
        <FormSection
          title="Clinical notes"
          description="Doctor's record. Requires Patients:UPDATE_MEDICAL."
          icon={<Stethoscope className="size-4" />}
          accent="medical"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="p-notes" className={labelClass}>
                <Stethoscope className="size-4" />
                Notes
              </FieldLabel>
              <Textarea
                id="p-notes"
                rows={5}
                placeholder={
                  medicalNotesDisabled
                    ? "Only users with Patients:UPDATE_MEDICAL can edit this field."
                    : "Observations, plan of care, follow-up instructions…"
                }
                disabled={medicalNotesDisabled}
                {...form.register("medicalNotes")}
              />
              <FieldDescription>
                {medicalNotesDisabled
                  ? "Read-only — clinical record is doctor-managed."
                  : "Visible to anyone with clinical access. Treat as part of the medical record."}
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FormSection>
      ) : null}

      {/* Status */}
      {mode === "edit" ? (
        <FormSection
          title="Account"
          description="Deactivating signs the patient out and blocks login."
          icon={<Lock className="size-4" />}
        >
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
                    Inactive patients can't log into the patient app and won't
                    appear in default lists.
                  </FieldDescription>
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={contactDisabled}
                />
              </Field>
            )}
          />
        </FormSection>
      ) : null}

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
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || readOnlyEverything}
        >
          {isSubmitting ? (
            <Spinner />
          ) : mode === "create" ? (
            "Create patient"
          ) : mode === "link" ? (
            "Link patient profile"
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </form>
  )
}

const labelClass =
  "flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"

function ReadOnlyField({
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
    <div className="rounded-xl border border-border/50 bg-card/80 p-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        {icon}
        {label}
      </p>
      <p
        className={
          "mt-1.5 truncate text-sm font-medium text-foreground " +
          (mono ? "font-mono tabular-nums" : "")
        }
        title={value}
      >
        {value}
      </p>
    </div>
  )
}

function FormSection({
  title,
  description,
  icon,
  accent,
  children,
}: {
  title: string
  description: string
  icon: React.ReactNode
  accent?: "medical"
  children: React.ReactNode
}) {
  return (
    <section
      className={
        "shadow-ambient rounded-2xl border bg-card p-6 " +
        (accent === "medical"
          ? "border-primary/30 bg-primary/3"
          : "border-border/70")
      }
    >
      <header className="mb-5 flex items-center gap-3">
        <span
          className={
            "flex size-9 items-center justify-center rounded-full " +
            (accent === "medical"
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground")
          }
        >
          {icon}
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </header>
      {children}
    </section>
  )
}
