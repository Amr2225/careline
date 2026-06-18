import { api } from "../api"
import type { Appointment } from "@careline/shared/prisma/client";
import type { AppointmentDetail, AppointmentWithSlot } from "@careline/shared/types/appointment.type";

export const appointmentsApi = {
    book: async (slotId: string) => {
        const { data } = await api.post<Appointment>(`/appointments`, { slotId })
        return data
    },
    cancel: async (id: string) => {
        const { data } = await api.delete<Appointment>(`/appointments/${id}`)
        return data
    },
    getMyAppointments: async () => {
        const { data } = await api.get<AppointmentWithSlot[]>('/appointments/me')
        return data
    },
    getById: async (id: string) => {
        const { data } = await api.get<AppointmentDetail>(`/appointments/${id}`)
        return data
    }
}