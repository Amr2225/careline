import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppointmentStatus } from '@careline/shared/types/appointment.type';

// DbService/RbacService are mocked at the module level so importing the service
// under test does not pull in the real Prisma client runtime (the @Injectable
// decorator metadata would otherwise force those classes to load as values).
jest.mock('@/db/db.service', () => ({ DbService: class DbService {} }));
jest.mock('@/rbac/rbac.service', () => ({ RbacService: class RbacService {} }));

import { AppointmentsService } from './appointments.service';

// Boundary mocks: Prisma (DbService) and RBAC. ConfigService.getOrThrow is fixed
// to a real IANA zone so the date-fns-tz math runs for real.
type AnyMock = jest.Mock;

function makeDb() {
    return {
        patient: { findUnique: jest.fn() as AnyMock },
        appointment: {
            findUnique: jest.fn() as AnyMock,
            findFirst: jest.fn() as AnyMock,
            count: jest.fn() as AnyMock,
            create: jest.fn() as AnyMock,
            update: jest.fn() as AnyMock,
        },
        availableSlot: { update: jest.fn() as AnyMock },
        $transaction: jest.fn() as AnyMock,
    };
}

function makeConfig() {
    return { getOrThrow: jest.fn().mockReturnValue('Africa/Cairo') } as unknown as ConfigService;
}

describe('AppointmentsService', () => {
    let db: ReturnType<typeof makeDb>;
    let rbac: { hasPermission: jest.Mock };
    let service: AppointmentsService;

    beforeEach(() => {
        db = makeDb();
        rbac = { hasPermission: jest.fn() };
        service = new AppointmentsService(db as any, makeConfig(), rbac as any);
    });

    describe('book', () => {
        it('throws NotFound when the patient does not exist', async () => {
            db.patient.findUnique.mockResolvedValue(null);

            await expect(service.book('slot-1', 'user-1')).rejects.toBeInstanceOf(NotFoundException);
            expect(db.$transaction).not.toHaveBeenCalled();
        });

        it('rejects with "Slot is full" when active bookings reach capacity', async () => {
            db.patient.findUnique.mockResolvedValue({ id: 'patient-1' });
            const tx = {
                $queryRaw: jest.fn().mockResolvedValue([{ id: 'slot-1', capacity: 2 }]),
                appointment: { count: jest.fn().mockResolvedValue(2), findFirst: jest.fn(), create: jest.fn() },
                availableSlot: { update: jest.fn() },
            };
            db.$transaction.mockImplementation(async (cb: any) => cb(tx));

            await expect(service.book('slot-1', 'user-1')).rejects.toThrow('Slot is full');
            expect(tx.appointment.create).not.toHaveBeenCalled();
        });

        it('rejects with "Already booked this slot" when a non-cancelled appointment exists', async () => {
            db.patient.findUnique.mockResolvedValue({ id: 'patient-1' });
            const tx = {
                $queryRaw: jest.fn().mockResolvedValue([{ id: 'slot-1', capacity: 5 }]),
                appointment: {
                    count: jest.fn().mockResolvedValue(1),
                    findFirst: jest.fn().mockResolvedValue({ id: 'existing-appt' }),
                    create: jest.fn(),
                },
                availableSlot: { update: jest.fn() },
            };
            db.$transaction.mockImplementation(async (cb: any) => cb(tx));

            await expect(service.book('slot-1', 'user-1')).rejects.toThrow('Already booked this slot');
            expect(tx.appointment.create).not.toHaveBeenCalled();
        });

        it('books the slot: bumps bookedCount to count+1 and creates a BOOKED appointment', async () => {
            db.patient.findUnique.mockResolvedValue({ id: 'patient-1' });
            const created = { id: 'appt-1', slotId: 'slot-1', patientId: 'patient-1', status: 'BOOKED' };
            const tx = {
                $queryRaw: jest.fn().mockResolvedValue([{ id: 'slot-1', capacity: 5 }]),
                appointment: {
                    count: jest.fn().mockResolvedValue(2),
                    findFirst: jest.fn().mockResolvedValue(null),
                    create: jest.fn().mockResolvedValue(created),
                },
                availableSlot: { update: jest.fn() },
            };
            db.$transaction.mockImplementation(async (cb: any) => cb(tx));

            const result = await service.book('slot-1', 'user-1');

            expect(result).toBe(created);
            expect(tx.availableSlot.update).toHaveBeenCalledWith({
                where: { id: 'slot-1' },
                data: { bookedCount: 3 },
            });
            expect(tx.appointment.create).toHaveBeenCalledWith({
                data: { slotId: 'slot-1', patientId: 'patient-1', status: AppointmentStatus.BOOKED },
            });
        });
    });

    describe('cancel', () => {
        const baseAppt = {
            id: 'appt-1',
            slotId: 'slot-1',
            patient: { user: { id: 'owner-user' } },
            slot: {},
        };

        it.each([
            ['CANCELLED', 'Appointment already cancelled'],
            ['DONE', 'Cannot cancel a completed appointment'],
            ['NO_SHOW', 'Cannot cancel a completed appointment'],
        ])('rejects cancelling an appointment in %s state', async (status, message) => {
            db.appointment.findUnique.mockResolvedValue({ ...baseAppt, status });

            await expect(service.cancel('appt-1', 'owner-user')).rejects.toThrow(message);
            expect(db.$transaction).not.toHaveBeenCalled();
        });

        it('forbids a non-owner caller lacking the Appointments:UPDATE permission', async () => {
            db.appointment.findUnique.mockResolvedValue({ ...baseAppt, status: 'BOOKED' });
            rbac.hasPermission.mockResolvedValue(false);

            await expect(service.cancel('appt-1', 'other-user')).rejects.toBeInstanceOf(ForbiddenException);
            expect(db.$transaction).not.toHaveBeenCalled();
        });

        it('cancels: decrements bookedCount and sets status CANCELLED', async () => {
            db.appointment.findUnique.mockResolvedValue({ ...baseAppt, status: 'BOOKED' });
            const tx = {
                availableSlot: { update: jest.fn() },
                appointment: { update: jest.fn().mockResolvedValue({ id: 'appt-1', status: 'CANCELLED' }) },
            };
            db.$transaction.mockImplementation(async (cb: any) => cb(tx));

            await service.cancel('appt-1', 'owner-user');

            expect(tx.availableSlot.update).toHaveBeenCalledWith({
                where: { id: 'slot-1' },
                data: { bookedCount: { decrement: 1 } },
            });
            expect(tx.appointment.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { id: 'appt-1' },
                    data: expect.objectContaining({ status: AppointmentStatus.CANCELLED }),
                }),
            );
        });
    });

    describe('getPositionForAppointment', () => {
        it('throws NotFound when the appointment is missing', async () => {
            db.appointment.findUnique.mockResolvedValue(null);
            await expect(service.getPositionForAppointment('nope')).rejects.toBeInstanceOf(NotFoundException);
        });

        it.each([
            AppointmentStatus.CANCELLED,
            AppointmentStatus.DONE,
            AppointmentStatus.NO_SHOW,
            AppointmentStatus.LATE_ARRIVING,
        ])('returns 0 for a %s appointment (no live queue position)', async (status) => {
            db.appointment.findUnique.mockResolvedValue({
                id: 'appt-1',
                status,
                slot: { startTime: new Date('2026-06-18T10:00:00Z') },
            });

            await expect(service.getPositionForAppointment('appt-1')).resolves.toBe(0);
            expect(db.appointment.count).not.toHaveBeenCalled();
        });

        it('returns aheadCount + 1 for an active appointment', async () => {
            db.appointment.findUnique.mockResolvedValue({
                id: 'appt-1',
                status: AppointmentStatus.BOOKED,
                bookedAt: new Date('2026-06-18T09:00:00Z'),
                slot: { startTime: new Date('2026-06-18T10:00:00Z') },
            });
            db.appointment.count.mockResolvedValue(3);

            await expect(service.getPositionForAppointment('appt-1')).resolves.toBe(4);
        });
    });
});
