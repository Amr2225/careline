export interface DefaultSettings {
    appointmentDurationMinutes: string;
    slotCapacity: string;
    clinicHours: string;
}

export type Settings = DefaultSettings & Record<string, unknown>
export type ClinicHours = Record<string | number, { open: string; close: string } | null>