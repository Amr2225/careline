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
  }
}
