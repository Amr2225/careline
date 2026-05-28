interface DefaultSettings {
    appointmentDurationMinutes: string;
    slotCapacity: string;
    clinicHours: string;
}

export type Settings = DefaultSettings & Record<string, unknown>