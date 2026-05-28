export enum AppointmentStatus {
    BOOKED = 'BOOKED',
    LATE_ARRIVING = 'LATE_ARRIVING',
    ARRIVED = 'ARRIVED',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    NO_SHOW = 'NO_SHOW',
    CANCELLED = 'CANCELLED'
}

export const AppointmentStatusLabel: Record<AppointmentStatus, string> = {
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