import type { ClinicHours, Settings, DefaultSettings } from "@careline/shared/types/settings.types"
import { api } from "../api"

export type SettingsResponse = Omit<DefaultSettings, "clinicHours"> & {
    clinicHours: ClinicHours
} & Record<string, unknown>

export type UpdateSettingsInput = {
    appointmentDurationMinutes: number
    slotCapacity: number
    clinicHours: ClinicHours
}

export const settingsApi = {
    getSettings: async (): Promise<SettingsResponse> => {
        const { data } = await api.get<Settings>("/settings")

        return {
            ...data,
            clinicHours: JSON.parse(data.clinicHours as string)
        }
    },

    updateSetting: async (key: string, value: string): Promise<void> => {
        await api.patch("/settings", { key, value })
    },

    // The backend PATCH /settings is per-key, so persist each changed key in turn.
    updateSettings: async (input: UpdateSettingsInput): Promise<void> => {
        await settingsApi.updateSetting("appointmentDurationMinutes", String(input.appointmentDurationMinutes))
        await settingsApi.updateSetting("slotCapacity", String(input.slotCapacity))
        await settingsApi.updateSetting("clinicHours", JSON.stringify(input.clinicHours))
    }
}