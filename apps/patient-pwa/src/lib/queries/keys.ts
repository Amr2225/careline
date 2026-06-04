export const queryKeys = {
    slots: {
        all: ['slots'] as const,
        getAvailableSlots: (date?: string) => ['slots', 'get-available-slots', date] as const,
        getNextAvailableSlot: () => ['slots', 'get-next-available-slot'] as const,
    },
    appointments: {
        all: ['appointments'] as const,
        detail: (id: string) => ['appointments', 'detail', id] as const,
    }
}