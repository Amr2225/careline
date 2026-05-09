import { api } from "@/lib/api"
import { Action } from "@careline/shared/types/rbac.type"

export type Role = {
  id: string
  name: string
  description: string
  isSystem: boolean
}

export type Permission = {
  module: { name: string }
  action: Action
}

export type RoleListItem = Role & {
  userCount: number
}

export type RoleDetail = Role & {
  permissions: Permission[]
  userCount: number
}

export type CreateRolePayload = {
  name: string
  description: string
  permissions: { moduleName: string; action: Action }[]
}

export type UpdateRolePayload = {
  name?: string
  description?: string
  permissions?: { moduleName: string; action: Action }[]
}

export const rolesApi = {
  list: async (): Promise<RoleListItem[]> => {
    const { data } = await api.get<RoleListItem[]>("/roles")
    return data
  },

  get: async (id: string): Promise<RoleDetail> => {
    const { data } = await api.get<RoleDetail>(`/roles/${id}`)
    return data
  },

  create: async (payload: CreateRolePayload): Promise<RoleDetail> => {
    const { data } = await api.post<RoleDetail>("/roles", payload)
    return data
  },

  update: async (
    id: string,
    payload: UpdateRolePayload
  ): Promise<RoleDetail> => {
    const { data } = await api.patch<RoleDetail>(`/roles/${id}`, payload)
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/roles/${id}`)
  },
}
