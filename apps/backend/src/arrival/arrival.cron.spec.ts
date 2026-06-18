import { Logger } from '@nestjs/common';

// Mock DbService so importing the cron does not load the real Prisma client
// runtime via @Injectable decorator metadata.
jest.mock('@/db/db.service', () => ({ DbService: class DbService {} }));

import { ArrivalCron } from './arrival.cron';
import { LATE_FLIP_LEAD_MINUTES, NO_SHOW_HOURS } from './arrival.constants';

// Boundary mock: Prisma (DbService). Clock is faked so the now-relative
// thresholds (now + lead, now - 24h) are exact. Logger output is silenced.
function makeDb() {
    return {
        appointment: { updateMany: jest.fn(), findMany: jest.fn() },
        availableSlot: { update: jest.fn() },
        $transaction: jest.fn(),
    };
}

const NOW = new Date('2026-06-18T12:00:00Z');

describe('ArrivalCron', () => {
    let db: ReturnType<typeof makeDb>;
    let cron: ArrivalCron;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(NOW);
        jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
        jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
        db = makeDb();
        cron = new ArrivalCron(db as any);
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    describe('flipLateArrivingStatuses', () => {
        it('flips BOOKED appointments whose slot starts within the lead window to LATE_ARRIVING', async () => {
            db.appointment.updateMany.mockResolvedValue({ count: 3 });

            await cron.flipLateArrivingStatuses();

            const arg = db.appointment.updateMany.mock.calls[0][0];
            expect(arg.where.status).toBe('BOOKED');
            expect(arg.data.status).toBe('LATE_ARRIVING');
            const expectedThreshold = NOW.getTime() + LATE_FLIP_LEAD_MINUTES * 60_000;
            expect((arg.where.slot.startTime.lte as Date).getTime()).toBe(expectedThreshold);

            expect(Logger.prototype.log).toHaveBeenCalledWith('Flipped 3 appointment(s) to LATE_ARRIVING');
        });

        it('swallows db errors instead of throwing', async () => {
            db.appointment.updateMany.mockRejectedValue(new Error('db down'));

            await expect(cron.flipLateArrivingStatuses()).resolves.toBeUndefined();
            expect(Logger.prototype.error).toHaveBeenCalled();
        });
    });

    describe('autoMarkNoShows', () => {
        it('marks stale appointments NO_SHOW and decrements each slot by its no-show count', async () => {
            // slot-A has two no-shows, slot-B has one.
            db.appointment.findMany.mockResolvedValue([
                { id: 'a1', slotId: 'slot-A' },
                { id: 'a2', slotId: 'slot-A' },
                { id: 'b1', slotId: 'slot-B' },
            ]);
            const tx = {
                appointment: { updateMany: jest.fn() },
                availableSlot: { update: jest.fn() },
            };
            db.$transaction.mockImplementation(async (cb: any) => cb(tx));

            await cron.autoMarkNoShows();

            // Finder targets BOOKED/LATE_ARRIVING past the 24h cutoff.
            const findArg = db.appointment.findMany.mock.calls[0][0];
            expect(findArg.where.status.in).toEqual(['BOOKED', 'LATE_ARRIVING']);
            const expectedCutoff = NOW.getTime() - NO_SHOW_HOURS * 60 * 60_000;
            expect((findArg.where.slot.startTime.lt as Date).getTime()).toBe(expectedCutoff);

            expect(tx.appointment.updateMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { id: { in: ['a1', 'a2', 'b1'] } },
                    data: expect.objectContaining({ status: 'NO_SHOW' }),
                }),
            );

            expect(tx.availableSlot.update).toHaveBeenCalledTimes(2);
            expect(tx.availableSlot.update).toHaveBeenCalledWith({
                where: { id: 'slot-A' },
                data: { bookedCount: { decrement: 2 } },
            });
            expect(tx.availableSlot.update).toHaveBeenCalledWith({
                where: { id: 'slot-B' },
                data: { bookedCount: { decrement: 1 } },
            });
        });

        it('does nothing when no appointments are stale', async () => {
            db.appointment.findMany.mockResolvedValue([]);

            await cron.autoMarkNoShows();

            expect(db.$transaction).not.toHaveBeenCalled();
        });
    });
});
