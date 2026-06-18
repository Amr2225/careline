export enum AppointmentStatus {
    BOOKED = 'BOOKED',
    LATE_ARRIVING = 'LATE_ARRIVING',
    ARRIVED = 'ARRIVED',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    NO_SHOW = 'NO_SHOW',
    CANCELLED = 'CANCELLED'
}

export const AppointmentStatusLabel: Record<keyof typeof AppointmentStatus, string> = {
    BOOKED: 'Booked',
    LATE_ARRIVING: 'Late Arriving',
    ARRIVED: 'Arrived',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    NO_SHOW: 'No Show',
    CANCELLED: 'Cancelled'
} as const;

export interface Appointment {
    id: string;
    patientName: string
    patientId: string;
    status: AppointmentStatus;
    bookedAt: Date;
}

export interface SlotAndAppointments {
    id: string;
    time: string;
    capacity: number;
    bookedCount: number;
    bookings: Appointment[];
}

export interface WeeklyAppointmentsView {
    date: string;
    slots: SlotAndAppointments[];
}

export interface Slot {
    id: string;
    startTime: Date;
    capacity: number;
    bookedCount: number;
    templateId: string | null;
    createdAt: Date;
}

export interface AppointmentWithSlot {
    id: string;
    patientId: string;
    slotId: string
    status: AppointmentStatus;
    bookedAt: Date;
    cancelledAt: Date | null;
    updatedAt: Date;
    slot: Slot;
}

export interface AppointmentDetail extends AppointmentWithSlot {
    position: number;
}