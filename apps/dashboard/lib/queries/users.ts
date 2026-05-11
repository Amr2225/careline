"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  usersApi,
  type CreateUserPayload,
  type ListUsersQuery,
  type UpdateUserPayload,
} from "@/lib/api/users"
import { queryKeys } from "./keys"

export function useUsers(query: ListUsersQuery = {}) {
  return useQuery({
    queryKey: queryKeys.users.list(query),
    queryFn: () => usersApi.list(query),
    staleTime: 30_000,
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.get(id),
    enabled: Boolean(id),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => usersApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => usersApi.update(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.users.detail(id), data)
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}

export function useUpdateUserRoles(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (roleIds: string[]) => usersApi.updateRoles(id, roleIds),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.users.detail(id), data)
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.roles.all })
    },
  })
}

export function useDeactivateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}
