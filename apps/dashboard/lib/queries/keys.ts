import type { ListUsersQuery } from "@/lib/api/users"

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
}
