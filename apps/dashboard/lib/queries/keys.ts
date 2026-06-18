import type { ListUsersQuery } from "@/lib/api/users"
import { ListPatientQuery } from "@careline/shared/types/patient.type"

export const queryKeys = {
  users: {
    all: ["users"] as const,
    list: (query: ListUsersQuery) => ["users", "list", query] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },
  roles: {
    all: ["roles"] as const,
    list: () => ["roles", "list"] as const,
    detail: (id: string) => ["roles", "detail", id] as const,
  },
  patients: {
    all: ['patients'] as const,
    list: (qeurry: ListPatientQuery) => ['patients', 'list', qeurry] as const,
    detail: (patientId: string) => ['patients', 'detail', patientId] as const,
    usersWithPatientRole: (search?: string) => ['patients', 'users', 'with-patient-role', search] as const,
  },
  appointments: {
    all: ['appointments'] as const,
    byDate: (date: string) => ['appointments', 'by-date', date] as const,
    byDateRange: (from: string, to: string) => ['appointments', 'by-date-range', from, to] as const,
    mutationKey: (appointmentId: string) => ['mark-arrive-no-show', appointmentId] as const
  },
  slots: {
    all: ['slots'] as const,
    getSlots: (from: string, to: string) => ['slots', 'get-slots', from, to] as const,
    deleteSlot: (slotId: string) => ['slots-delete', slotId] as const,
  },
  slotTemplates: {
    all: ['slot-templates'] as const,
    detail: (id: string) => ['slot-templates', 'detail', id] as const,
  },
  settings: {
    all: ['settings'] as const,
    get: () => ['settings', 'get'] as const,
  }
}
