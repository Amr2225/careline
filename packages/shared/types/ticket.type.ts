import type { TicketSourceType, TicketStatus, LateArrivalBucket } from "../prisma/index";

// A row in the live queue board (already ordered by QueueOrderingService).
export interface QueueTicket {
    id: string;
    patientId: string;
    patientName: string;
    sourceType: TicketSourceType;
    status: TicketStatus;
    priority: boolean;
    lateArrivalBucket: LateArrivalBucket | null;
    assignedDoctorId: string | null;
    assignedDoctorName: string | null;
    joinedQueueAt: Date;
    position: number; // 1-based place among active tickets
}

// Patient-facing view of their own active ticket.
export interface MyTicket {
    id: string;
    status: TicketStatus;
    priority: boolean;
    position: number;
    joinedQueueAt: Date;
}

// GET /queue/qr — short-lived check-in token plus the deep link the QR encodes.
export interface QrTokenResponse {
    token: string;
    url: string;
    expiresInSeconds: number;
}
