import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { appointmentsApi } from "../api/appointments"
import { queryKeys } from "./keys"

/**
 * A Hook to book an appointment
 */
export const useBookAppointment = (date?: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (slotId: string) => appointmentsApi.book(slotId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.slots.getAvailableSlots(date) })
            void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all })
        }
    })
}

/**
 * A Hook to get the user's appointments
 */
export const useGetMyAppointments = () => {
    return useQuery({
        queryKey: queryKeys.appointments.all,
        queryFn: appointmentsApi.getMyAppointments,
    })
}

/**
 * A Hook to get an appointment by id
 */
export const useGetAppointmentById = (id: string) => {
    return useQuery({
        queryKey: queryKeys.appointments.detail(id),
        queryFn: () => appointmentsApi.getById(id),
        // Poll frequently so a server-side status flip (e.g. BOOKED -> LATE_ARRIVING)
        // is reflected on the detail page within 15s.
        refetchInterval: 15_000
    })
}

/**
 * A Hook to cancel an appointment
 */
export const useCancelAppointment = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => appointmentsApi.cancel(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all })
            void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.detail(id) })
        }
    })
}