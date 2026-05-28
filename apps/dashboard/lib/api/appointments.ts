import { SlotAndAppointments, WeeklyAppointmentsView } from "@careline/shared/types/appointment.type"
import { api } from "../api"

export const appointmentsApi = {
    // ISO String
    getByDate: async (date: string) => {
        const { data } = await api.get<SlotAndAppointments[]>("appointments/by-date", { params: { from: date } })
        return data
    },
    getByDateRange: async (from: string, to: string) => {
        const { data } = await api.get<WeeklyAppointmentsView[]>("appointments/by-date-range", { params: { from, to } })
        return data
    }
}