"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  rolesApi,
  type CreateRolePayload,
  type UpdateRolePayload,
} from "@/lib/api/roles"
import { queryKeys } from "./keys"

export function useRoles() {
  return useQuery({
    queryKey: queryKeys.roles.list(),
    queryFn: () => rolesApi.list(),
    staleTime: 60_000,
  })
}

export function useRole(id: string) {
  return useQuery({
    queryKey: queryKeys.roles.detail(id),
    queryFn: () => rolesApi.get(id),
    enabled: Boolean(id),
  })
}

export function useCreateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateRolePayload) => rolesApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.roles.all })
    },
  })
}

export function useUpdateRole(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateRolePayload) => rolesApi.update(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.roles.detail(id), data)
      void queryClient.invalidateQueries({ queryKey: queryKeys.roles.list() })
    },
  })
}

export function useDeleteRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => rolesApi.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.roles.all })
    },
  })
}
