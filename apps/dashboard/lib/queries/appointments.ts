import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { appointmentsApi } from "../api/appointments";

export function useAppointmentsByDate(date: string) {
    return useQuery({
        queryKey: queryKeys.appointments.byDate(date),
        queryFn: () => appointmentsApi.getByDate(date),
        staleTime: 30_000,
        placeholderData: (prev) => prev
    })
}

export function useAppointmentsByDateRange(from: string, to: string) {
    return useQuery({
        queryKey: queryKeys.appointments.byDateRange(from, to),
        queryFn: () => appointmentsApi.getByDateRange(from, to),
        staleTime: 30_000,
        placeholderData: (prev) => prev
    })
}