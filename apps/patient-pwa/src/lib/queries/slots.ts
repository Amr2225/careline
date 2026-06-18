import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { slotsApi } from "../api/slots";

/**
 * A Hook to get the available slots for a given date
 */
export const useAvailableSlots = (date: string) => {
    return useQuery({
        queryKey: queryKeys.slots.getAvailableSlots(date),
        queryFn: () => slotsApi.getAvailableSlots(date),
        staleTime: 30_000,
        placeholderData: (prev) => prev
    })
}

/**
 * A Hook to get the next available slot
 */
export const useNextAvailableSlot = () => {
    return useQuery({
        queryKey: queryKeys.slots.getNextAvailableSlot(),
        queryFn: () => slotsApi.getNextAvailableSlot(),
    })
}