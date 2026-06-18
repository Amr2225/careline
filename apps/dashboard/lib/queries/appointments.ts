import { useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { appointmentsApi } from "../api/appointments";
import { toast } from "sonner";
import { extractErrorMessage } from "../errors";

/**
 * A Hook to get the appointments for a given date
 */
export function useAppointmentsByDate(date: string) {
    return useQuery({
        queryKey: queryKeys.appointments.byDate(date),
        queryFn: () => appointmentsApi.getByDate(date),
        staleTime: 30_000,
        refetchInterval: 30_000,
        placeholderData: (prev) => prev
    })
}

/**
 * A Hook to get the appointments for a given date Range
 */
export function useAppointmentsByDateRange(from: string, to: string) {
    return useQuery({
        queryKey: queryKeys.appointments.byDateRange(from, to),
        queryFn: () => appointmentsApi.getByDateRange(from, to),
        staleTime: 30_000,
        refetchInterval: 30_000,
        placeholderData: (prev) => prev
    })
}

/**
 * A Hook to mark an appointment as arrived
 */
export function useMarkArrived(appointmentId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: queryKeys.appointments.mutationKey(appointmentId),
        mutationFn: () => appointmentsApi.markArrived(appointmentId),
        onSuccess: () => {
            toast.success("Appointment marked as arrived")
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("by-date-range") || query.queryKey.includes("by-date") })
        },
        onError: (error) => {
            toast.error("Failed to mark appointment as arrived", {
                description: extractErrorMessage(error),
            })
        }
    })
}

/**
 * A Hook to mark an appointment as no-show
 */
export function useMarkNoShow(appointmentId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: queryKeys.appointments.mutationKey(appointmentId),
        mutationFn: () => appointmentsApi.markNoShow(appointmentId),
        onSuccess: () => {
            toast.success("Appointment marked as no-show")
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("by-date-range") || query.queryKey.includes("by-date") })
        },
        onError: (error) => {
            toast.error("Failed to mark appointment as no-show", {
                description: extractErrorMessage(error),
            })
        }
    })
}

/**
 * A Hook to get the loading state of the mutations
 */
export function useActionsState(appointmentId: string) {
    const state = useMutationState({
        filters: { mutationKey: queryKeys.appointments.mutationKey(appointmentId) },
        select: (mutation) => mutation.state.status
    })

    return {
        isLoading: state.some(status => status === 'pending'),
    }
}