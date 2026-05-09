import { api } from "@/lib/api"
import type { Role } from "./roles"

export type UserListItem = {
  id: string
  email: string
  name: string
  isActive: boolean
  createdAt: string
  roles: Role[]
}

export type UserDetail = UserListItem & {
  updatedAt: string
}

export type ListUsersQuery = {
  name?: string
  roleId?: string
  isActive?: boolean
}

export type CreateUserPayload = {
  name: string
  email: string
  password: string
  roleIds: string[]
}

export type UpdateUserPayload = {
  name?: string
  email?: string
  password?: string
  isActive?: boolean
}

export const usersApi = {
  list: async (query: ListUsersQuery = {}): Promise<UserListItem[]> => {
    const { data } = await api.get<UserListItem[]>("/users", { params: query })
    return data
  },

  get: async (id: string): Promise<UserDetail> => {
    const { data } = await api.get<UserDetail>(`/users/${id}`)
    return data
  },

  create: async (payload: CreateUserPayload): Promise<UserDetail> => {
    const { data } = await api.post<UserDetail>("/users", payload)
    return data
  },

  update: async (
    id: string,
    payload: UpdateUserPayload
  ): Promise<UserDetail> => {
    const { data } = await api.patch<UserDetail>(`/users/${id}`, payload)
    return data
  },

  updateRoles: async (id: string, roleIds: string[]): Promise<UserDetail> => {
    const { data } = await api.patch<UserDetail>(`/users/${id}/roles`, {
      roleIds,
    })
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
