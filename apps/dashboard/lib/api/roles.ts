import { api } from "@/lib/api"
import { Action } from "@careline/shared/types/rbac.type"

export type UserRoles = {
  id: string;
  assignedAt: Date;
  assignedById: string | null;
  role: Role;
}

export type Role = {
  id: string
  name: string
  description: string
  isSystem: boolean
  createdAt: Date;
  updatedAt: Date;
}

export type Permission = {
  module: { name: string }
  action: Action
}

export type RoleItem = Role & {
  _count: { users: number }
  permissions: Permission[]
}

export type CreateRolePayload = {
  name: string
  description: string
  permissions: string[]
}

export type UpdateRolePayload = {
  name?: string
  description?: string
  permissions?: string[]
}

export const rolesApi = {
  list: async (): Promise<RoleItem[]> => {
    const { data } = await api.get<RoleItem[]>("/roles")
    return data
  },

  get: async (id: string): Promise<RoleItem> => {
    const { data } = await api.get<RoleItem>(`/roles/${id}`)
    return data
  },

  create: async (payload: CreateRolePayload): Promise<RoleItem> => {
    const { data } = await api.post<RoleItem>("/roles", payload)
    return data
  },

  update: async (
    id: string,
    payload: UpdateRolePayload
  ): Promise<RoleItem> => {
    const { data } = await api.patch<RoleItem>(`/roles/${id}`, payload)
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/roles/${id}`)
  },
}
