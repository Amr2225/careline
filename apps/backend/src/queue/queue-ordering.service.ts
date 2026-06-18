import { Injectable } from '@nestjs/common';
import type { LateArrivalBucket, TicketSourceType, TicketStatus } from '@careline/shared/prisma/index';

// The only fields ordering depends on. Any ticket-shaped object can be ordered.
export interface OrderableTicket {
    status: TicketStatus;
    sourceType: TicketSourceType;
    lateArrivalBucket: LateArrivalBucket | null;
    scheduledSlotTime: Date | null;
    inProgressAt: Date | null;
    joinedQueueAt: Date;
}

// The 5 queue buckets, lowest = served first (see Phase 6 spec §4).
const BUCKET = {
    IN_PROGRESS: 1,
    FRONT_INSERT: 2,
    ON_TIME: 3,
    WALK_IN: 4,
    VERY_LATE: 5,
} as const;

@Injectable()
export class QueueOrderingService {
    // Single source of truth for queue order. Both the dashboard board and patient
    // position computation sort through here so they can never disagree.
    order<T extends OrderableTicket>(tickets: T[]): T[] {
        return [...tickets].sort((a, b) => {
            const bucketDiff = this.bucketOf(a) - this.bucketOf(b);
            if (bucketDiff !== 0) return bucketDiff;
            return this.tiebreak(a).getTime() - this.tiebreak(b).getTime();
        });
    }

    private bucketOf(ticket: OrderableTicket): number {
        if (ticket.status === 'IN_PROGRESS') return BUCKET.IN_PROGRESS;
        if (ticket.sourceType === 'WALK_IN') return BUCKET.WALK_IN;

        switch (ticket.lateArrivalBucket) {
            case 'FRONT_INSERT': return BUCKET.FRONT_INSERT;
            case 'VERY_LATE': return BUCKET.VERY_LATE;
            // ON_TIME, or an appointment ticket with no bucket yet, sorts on-time.
            default: return BUCKET.ON_TIME;
        }
    }

    // Within a bucket: on-time appointments by slot time, everyone else by arrival order.
    private tiebreak(ticket: OrderableTicket): Date {
        if (ticket.status === 'IN_PROGRESS') return ticket.inProgressAt ?? ticket.joinedQueueAt;
        if (ticket.lateArrivalBucket === 'ON_TIME' && ticket.scheduledSlotTime) return ticket.scheduledSlotTime;
        return ticket.joinedQueueAt;
    }
}
