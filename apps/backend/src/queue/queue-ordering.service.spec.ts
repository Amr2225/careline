import { QueueOrderingService, OrderableTicket } from './queue-ordering.service';

const base: OrderableTicket = {
    status: 'WAITING',
    sourceType: 'APPOINTMENT',
    lateArrivalBucket: 'ON_TIME',
    scheduledSlotTime: new Date('2026-06-18T09:00:00Z'),
    inProgressAt: null,
    joinedQueueAt: new Date('2026-06-18T08:00:00Z'),
};

function ticket(id: string, overrides: Partial<OrderableTicket>): OrderableTicket & { id: string } {
    return { id, ...base, ...overrides };
}

describe('QueueOrderingService', () => {
    const service = new QueueOrderingService();

    it('orders the five buckets: IN_PROGRESS, FRONT_INSERT, ON_TIME, WALK_IN, VERY_LATE', () => {
        const tickets = [
            ticket('walkin', { sourceType: 'WALK_IN', lateArrivalBucket: null }),
            ticket('veryLate', { lateArrivalBucket: 'VERY_LATE' }),
            ticket('inProgress', { status: 'IN_PROGRESS', inProgressAt: new Date('2026-06-18T09:30:00Z') }),
            ticket('onTime', { lateArrivalBucket: 'ON_TIME' }),
            ticket('frontInsert', { lateArrivalBucket: 'FRONT_INSERT' }),
        ];

        const ordered = service.order(tickets).map((t) => (t as { id: string }).id);

        expect(ordered).toEqual(['inProgress', 'frontInsert', 'onTime', 'walkin', 'veryLate']);
    });

    it('orders ON_TIME appointments by scheduled slot time', () => {
        const tickets = [
            ticket('late', { scheduledSlotTime: new Date('2026-06-18T10:00:00Z') }),
            ticket('early', { scheduledSlotTime: new Date('2026-06-18T09:00:00Z') }),
        ];

        const ordered = service.order(tickets).map((t) => (t as { id: string }).id);

        expect(ordered).toEqual(['early', 'late']);
    });

    it('orders within the walk-in bucket by arrival (joinedQueueAt) order', () => {
        const tickets = [
            ticket('second', { sourceType: 'WALK_IN', lateArrivalBucket: null, joinedQueueAt: new Date('2026-06-18T08:30:00Z') }),
            ticket('first', { sourceType: 'WALK_IN', lateArrivalBucket: null, joinedQueueAt: new Date('2026-06-18T08:10:00Z') }),
        ];

        const ordered = service.order(tickets).map((t) => (t as { id: string }).id);

        expect(ordered).toEqual(['first', 'second']);
    });
});
