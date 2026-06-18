import type { SlotWithProjectedPosition } from "@careline/shared/types/slots.type";
import { api } from "../api";

export const slotsApi = {
    getAvailableSlots: async (date: string): Promise<SlotWithProjectedPosition[]> => {
        const { data } = await api.get<SlotWithProjectedPosition[]>('/slots/available', { params: { date } });
        return data;
    },
    getNextAvailableSlot: async (): Promise<SlotWithProjectedPosition | null> => {
        const { data } = await api.get<SlotWithProjectedPosition | null>('/slots/next-available');
        return data;
    }
}