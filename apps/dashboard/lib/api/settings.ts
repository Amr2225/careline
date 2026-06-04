import type { ClinicHours, Settings, DefaultSettings } from "@careline/shared/types/serttings.types"
import { api } from "../api"

export type SettingsResponse = Omit<DefaultSettings, "clinicHours"> & {
    clinicHours: ClinicHours
} & Record<string, unknown>

export const settingsApi = {
    getSettings: async (): Promise<SettingsResponse> => {
        const { data } = await api.get<Settings>("/settings")

        return {
            ...data,
            clinicHours: JSON.parse(data.clinicHours as string)
        }
    }
}