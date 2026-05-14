import { api } from "@/lib/api"
import type { Role, UserRoles } from "./roles"

export type UserListItem = {
  id: string
  email: string
  name: string
  isActive: boolean
  createdAt: string
  userRoles: UserRoles[]
}

export type UserDetail = Omit<UserListItem, 'userRoles'> & {
  roles: Role[]
  permissions: string[]
  updatedAt: string
  phoneNumber?: string
  id: string
  name: string
  isActive: boolean
  email: string
}

export type ListUsersQuery = {
  name?: string
  roles?: string, // Comma separated list of role names
  isActive?: boolean
}

export type CreateUserPayload = {
  name: string
  email: string
  password: string
  roles: string[]
}

export type UpdateUserPayload = {
  name?: string
  email?: string
  password?: string
  isActive?: boolean
  roles?: string[]
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
    const { data } = await api.patch<UserDetail>(`/users/${id}/role`, {
      roleIds,
    })
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
