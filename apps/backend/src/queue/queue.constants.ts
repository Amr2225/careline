import type { AppointmentStatus, TicketStatus } from '@careline/shared/prisma/index';

// Tickets that occupy a live queue slot (count toward capacity, appear on the board).
export const ACTIVE_TICKET_STATUSES: TicketStatus[] = ['WAITING', 'CALLED', 'IN_PROGRESS'];

// A patient with an appointment in any of these states is already in the day's
// flow and must not also take a walk-in slot.
export const BLOCKING_APPOINTMENT_STATUSES: AppointmentStatus[] = [
    'BOOKED',
    'LATE_ARRIVING',
    'ARRIVED',
    'IN_PROGRESS',
];

// Short-lived QR check-in token. `purpose` prevents the token being replayed
// against any other JWT-verifying endpoint (same lesson as the auth audience claim).
export const WALK_IN_TOKEN_PURPOSE = 'walk-in-checkin';
export const WALK_IN_TOKEN_TTL_SECONDS = 300; // 5 min; dashboard refreshes the QR every ~4 min
