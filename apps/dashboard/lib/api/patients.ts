import { CreatePatientPayload, CreatePatientWithUserPayload, ListPatientQuery, PaginatedPatientList, Patient, UpdatePatientMedicalPayload, UpdatePatientPayload } from "@careline/shared/types/patient.type";
import { api } from "@/lib/api";
import { UserWithoutPassword } from "@careline/shared/types/user.type";


export const patientApi = {
    list: async (query: ListPatientQuery): Promise<PaginatedPatientList> => {
        const { data } = await api.get<PaginatedPatientList>("/patients", { params: query })
        return data;
    },

    get: async (patientId: string): Promise<Patient> => {
        const { data } = await api.get<Patient>(`/patients/${patientId}`)
        return data;
    },

    getUsersWithPatientRole: async (search?: string): Promise<UserWithoutPassword[]> => {
        const { data } = await api.get<UserWithoutPassword[]>("/patients/users", { params: { search } })
        return data;
    },

    create: async (payload: CreatePatientPayload): Promise<Patient> => {
        const { data } = await api.post<Patient>("/patients", payload)
        return data;
    },

    createWithUser: async (payload: CreatePatientWithUserPayload): Promise<Patient> => {
        const { data } = await api.post<Patient>("/patients/with-user", payload)
        return data;
    },

    update: async (patientId: string, payload: UpdatePatientPayload): Promise<Patient> => {
        const { data } = await api.patch<Patient>(`/patients/${patientId}`, payload)
        return data;
    },

    updateMedical: async (patientId: string, payload: UpdatePatientMedicalPayload): Promise<Patient> => {
        const { data } = await api.patch<Patient>(`/patients/${patientId}/medical`, payload)
        return data;
    },

    remove: async (patientId: string): Promise<void> => {
        await api.delete(`/patients/${patientId}`)
    },
}