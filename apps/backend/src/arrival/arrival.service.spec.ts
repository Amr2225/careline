import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

// Mock the DB/RBAC modules so importing the service does not load the real
// Prisma client runtime via @Injectable decorator metadata.
jest.mock('@/db/db.service', () => ({ DbService: class DbService {} }));
jest.mock('@/rbac/rbac.service', () => ({ RbacService: class RbacService {} }));

import { ArrivalService } from './arrival.service';

// Boundary mocks: Prisma (DbService) and RBAC. Clock is faked so the
// late-arrival bucketing (now vs slot.startTime) is deterministic.
function makeDb() {
    return {
        appointment: { findUnique: jest.fn(), update: jest.fn() },
        availableSlot: { update: jest.fn() },
        $transaction: jest.fn(),
    };
}

const NOW = new Date('2026-06-18T12:00:00Z');

describe('ArrivalService', () => {
    let db: ReturnType<typeof makeDb>;
    let rbac: { hasPermission: jest.Mock };
    let service: ArrivalService;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(NOW);
        db = makeDb();
        rbac = { hasPermission: jest.fn() };
        service = new ArrivalService(db as any, rbac as any);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    function apptWith(overrides: Record<string, unknown>) {
        return {
            id: 'appt-1',
            slotId: 'slot-1',
            patient: { user: { id: 'owner-user' } },
            slot: { startTime: NOW },
            ...overrides,
        };
    }

    describe('recordArrival', () => {
        it('throws NotFound when the appointment is missing', async () => {
            db.appointment.findUnique.mockResolvedValue(null);
            await expect(service.recordArrival('appt-1', 'owner-user')).rejects.toBeInstanceOf(NotFoundException);
        });

        it('forbids a non-owner caller lacking Appointments:UPDATE', async () => {
            db.appointment.findUnique.mockResolvedValue(apptWith({ status: 'BOOKED' }));
            rbac.hasPermission.mockResolvedValue(false);

            await expect(service.recordArrival('appt-1', 'other-user')).rejects.toBeInstanceOf(ForbiddenException);
            expect(db.$transaction).not.toHaveBeenCalled();
        });

        it.each(['ARRIVED', 'IN_PROGRESS', 'DONE', 'NO_SHOW', 'CANCELLED'])(
            'rejects recording arrival for a %s appointment',
            async (status) => {
                db.appointment.findUnique.mockResolvedValue(apptWith({ status }));

                await expect(service.recordArrival('appt-1', 'owner-user')).rejects.toBeInstanceOf(BadRequestException);
                expect(db.$transaction).not.toHaveBeenCalled();
            },
        );

        it('buckets a BOOKED arrival as ON_TIME and marks it ARRIVED in the tx', async () => {
            db.appointment.findUnique.mockResolvedValue(apptWith({ status: 'BOOKED' }));
            const tx = { appointment: { update: jest.fn().mockResolvedValue({ id: 'appt-1' }) } };
            db.$transaction.mockImplementation(async (cb: any) => cb(tx));

            await service.recordArrival('appt-1', 'owner-user');

            expect(tx.appointment.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { id: 'appt-1' },
                    data: { status: 'ARRIVED', arrivedAt: NOW, lateArrival: 'ON_TIME' },
                }),
            );
        });

        it.each([
            ['within the 15-min grace', new Date(NOW.getTime() - 10 * 60_000), 'FRONT_INSERT'],
            ['past the 15-min grace', new Date(NOW.getTime() - 20 * 60_000), 'VERY_LATE'],
        ])('buckets a LATE_ARRIVING arrival %s as %s', async (_label, startTime, expectedBucket) => {
            db.appointment.findUnique.mockResolvedValue(apptWith({ status: 'LATE_ARRIVING', slot: { startTime } }));
            const tx = { appointment: { update: jest.fn().mockResolvedValue({ id: 'appt-1' }) } };
            db.$transaction.mockImplementation(async (cb: any) => cb(tx));

            await service.recordArrival('appt-1', 'owner-user');

            expect(tx.appointment.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.objectContaining({ status: 'ARRIVED', lateArrival: expectedBucket }),
                }),
            );
        });
    });

    describe('markNoShow', () => {
        it('throws NotFound when the appointment is missing', async () => {
            db.appointment.findUnique.mockResolvedValue(null);
            await expect(service.markNoShow('appt-1', 'staff-user')).rejects.toBeInstanceOf(NotFoundException);
        });

        it.each(['ARRIVED', 'IN_PROGRESS', 'DONE', 'NO_SHOW', 'CANCELLED'])(
            'rejects marking a %s appointment as no-show',
            async (status) => {
                db.appointment.findUnique.mockResolvedValue(apptWith({ status }));

                await expect(service.markNoShow('appt-1', 'staff-user')).rejects.toBeInstanceOf(BadRequestException);
                expect(db.$transaction).not.toHaveBeenCalled();
            },
        );

        it.each(['BOOKED', 'LATE_ARRIVING'])(
            'marks a %s appointment NO_SHOW and frees one slot seat',
            async (status) => {
                db.appointment.findUnique.mockResolvedValue(apptWith({ status }));
                const tx = {
                    appointment: { update: jest.fn().mockResolvedValue({ id: 'appt-1' }) },
                    availableSlot: { update: jest.fn() },
                };
                db.$transaction.mockImplementation(async (cb: any) => cb(tx));

                await service.markNoShow('appt-1', 'staff-user');

                expect(tx.appointment.update).toHaveBeenCalledWith(
                    expect.objectContaining({
                        where: { id: 'appt-1' },
                        data: expect.objectContaining({
                            status: 'NO_SHOW',
                            noShowAt: NOW,
                            noShowMarkedById: 'staff-user',
                        }),
                    }),
                );
                expect(tx.availableSlot.update).toHaveBeenCalledWith({
                    where: { id: 'slot-1' },
                    data: { bookedCount: { decrement: 1 } },
                });
            },
        );
    });
});
