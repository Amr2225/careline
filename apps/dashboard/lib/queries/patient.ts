import { CreatePatientPayload, CreatePatientWithUserPayload, ListPatientQuery, UpdatePatientMedicalPayload, UpdatePatientPayload } from "@careline/shared/types/patient.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { patientApi, } from "@/lib/api/patients"
import { queryKeys } from "./keys"

// TODO: implement pagination for this query.
export function usePatients(query: ListPatientQuery = {}) {
    return useQuery({
        queryKey: queryKeys.patients.list(query),
        queryFn: () => patientApi.list(query),
        staleTime: 30_000,
        placeholderData: (prev) => prev
    })
}

export function useUsersWithPatientRole({ search }: { search?: string }) {
    return useQuery({
        queryKey: queryKeys.patients.usersWithPatientRole(search),
        queryFn: () => patientApi.getUsersWithPatientRole(search),
        staleTime: 30_000,
    })
}

export function usePatient(patientId: string) {
    return useQuery({
        queryKey: queryKeys.patients.detail(patientId),
        queryFn: () => patientApi.get(patientId),
        staleTime: 30_000,
    })
}

export function useCreatePatient() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: CreatePatientPayload) => patientApi.create(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.patients.all })
        }
    })
}

export function useCreatePatientWithUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: CreatePatientWithUserPayload) => patientApi.createWithUser(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.patients.all })
        }
    })
}

export function useUpdatePatient(patientId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: UpdatePatientPayload) => patientApi.update(patientId, payload),
        onSuccess: (data) => {
            // Any component currently using usePatient(patientId) can show the updated data immediately without waiting for another network request. 
            queryClient.setQueryData(queryKeys.patients.detail(patientId), data)
            void queryClient.invalidateQueries({ queryKey: queryKeys.patients.detail(patientId) })
        }
    })
}

export function useUpdatePatientMedical(patientId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: UpdatePatientMedicalPayload) => patientApi.updateMedical(patientId, payload),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.patients.detail(patientId), data)
            void queryClient.invalidateQueries({ queryKey: queryKeys.patients.detail(patientId) })
        }
    })
}

export function useRemovePatient() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (patientId: string) => patientApi.remove(patientId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.patients.all })
        }
    })
}