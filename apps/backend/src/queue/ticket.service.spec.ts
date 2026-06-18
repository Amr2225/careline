// Mock the @Injectable deps that pull the real Prisma client runtime in.
jest.mock('@/db/db.service', () => ({ DbService: class DbService {} }));
jest.mock('@/rbac/rbac.service', () => ({ RbacService: class RbacService {} }));

import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { QueueOrderingService } from './queue-ordering.service';

const TZ = 'Africa/Cairo';

function makeDb() {
    return {
        patient: { findUnique: jest.fn() },
        user: { findUnique: jest.fn() },
        appointment: { findFirst: jest.fn() },
        ticket: {
            findFirst: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn().mockResolvedValue([]),
            create: jest.fn(),
            update: jest.fn(),
            count: jest.fn().mockResolvedValue(0),
        },
        $transaction: jest.fn(),
    };
}

function makeService(db: ReturnType<typeof makeDb>, rbac: { getRoles: jest.Mock } = { getRoles: jest.fn() }) {
    const config = { getOrThrow: jest.fn().mockReturnValue(TZ) };
    return new TicketService(db as any, rbac as any, config as any, new QueueOrderingService());
}

describe('TicketService.createFromWalkIn', () => {
    it('forbids a caller with no patient record', async () => {
        const db = makeDb();
        db.patient.findUnique.mockResolvedValue(null);
        await expect(makeService(db).createFromWalkIn('user-1')).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects a patient already holding an active ticket', async () => {
        const db = makeDb();
        db.patient.findUnique.mockResolvedValue({ id: 'p1' });
        db.ticket.findFirst.mockResolvedValue({ id: 'existing' });
        await expect(makeService(db).createFromWalkIn('user-1')).rejects.toBeInstanceOf(ConflictException);
    });

    it('rejects a patient with a blocking appointment today', async () => {
        const db = makeDb();
        db.patient.findUnique.mockResolvedValue({ id: 'p1' });
        db.ticket.findFirst.mockResolvedValue(null);
        db.appointment.findFirst.mockResolvedValue({ id: 'appt-today' });
        await expect(makeService(db).createFromWalkIn('user-1')).rejects.toBeInstanceOf(ConflictException);
    });

    it('creates a walk-in ticket and returns its 1-based position', async () => {
        const db = makeDb();
        db.patient.findUnique.mockResolvedValue({ id: 'p1' });
        db.ticket.findFirst.mockResolvedValue(null);
        db.appointment.findFirst.mockResolvedValue(null);
        db.ticket.create.mockResolvedValue({ id: 't1' });
        db.ticket.findMany.mockResolvedValue([
            { id: 't1', status: 'WAITING', sourceType: 'WALK_IN', lateArrivalBucket: null, scheduledSlotTime: null, inProgressAt: null, joinedQueueAt: new Date() },
        ]);

        const result = await makeService(db).createFromWalkIn('user-1');

        expect(db.ticket.create).toHaveBeenCalledWith({ data: { patientId: 'p1', sourceType: 'WALK_IN' } });
        expect(result).toEqual({ ticketId: 't1', position: 1 });
    });
});

describe('TicketService transitions', () => {
    it('call rejects a non-WAITING ticket', async () => {
        const db = makeDb();
        db.ticket.findUnique.mockResolvedValue({ id: 't1', status: 'CALLED' });
        await expect(makeService(db).call('t1', 'd1')).rejects.toBeInstanceOf(BadRequestException);
    });

    it('call rejects a doctor who lacks the Doctor role', async () => {
        const db = makeDb();
        db.ticket.findUnique.mockResolvedValue({ id: 't1', status: 'WAITING' });
        db.user.findUnique.mockResolvedValue({ id: 'd1', isActive: true });
        const rbac = { getRoles: jest.fn().mockResolvedValue([{ name: 'Receptionist' }]) };
        await expect(makeService(db, rbac).call('t1', 'd1')).rejects.toBeInstanceOf(BadRequestException);
    });

    it('call assigns the doctor and moves the ticket to CALLED', async () => {
        const db = makeDb();
        db.ticket.findUnique.mockResolvedValue({ id: 't1', status: 'WAITING' });
        db.user.findUnique.mockResolvedValue({ id: 'd1', isActive: true });
        db.ticket.update.mockResolvedValue({ id: 't1' });
        const rbac = { getRoles: jest.fn().mockResolvedValue([{ name: 'Doctor' }]) };

        await makeService(db, rbac).call('t1', 'd1');

        expect(db.ticket.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: expect.objectContaining({ status: 'CALLED', assignedDoctorId: 'd1' }) }),
        );
    });

    it('markInProgress rejects when the doctor is already seeing a patient', async () => {
        const db = makeDb();
        db.ticket.findUnique.mockResolvedValue({ id: 't1', status: 'CALLED', assignedDoctorId: 'd1' });
        db.ticket.count.mockResolvedValue(1);
        await expect(makeService(db).markInProgress('t1')).rejects.toBeInstanceOf(ConflictException);
    });

    it('markDone syncs the linked appointment to DONE', async () => {
        const db = makeDb();
        db.ticket.findUnique.mockResolvedValue({ id: 't1', status: 'IN_PROGRESS' });
        const tx = {
            ticket: { update: jest.fn().mockResolvedValue({ id: 't1', appointmentId: 'a1' }) },
            appointment: { update: jest.fn() },
        };
        db.$transaction.mockImplementation(async (cb: any) => cb(tx));

        await makeService(db).markDone('t1');

        expect(tx.appointment.update).toHaveBeenCalledWith({ where: { id: 'a1' }, data: { status: 'DONE' } });
    });

    it('skip re-queues the same row at the back of its bucket and increments skipCount', async () => {
        const db = makeDb();
        db.ticket.findUnique.mockResolvedValue({ id: 't1', status: 'CALLED' });
        db.ticket.update.mockResolvedValue({ id: 't1' });

        await makeService(db).skip('t1');

        expect(db.ticket.update).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ status: 'WAITING', assignedDoctorId: null, skipCount: { increment: 1 } }),
            }),
        );
    });

    it('getTicketOrThrow path: NotFound when the ticket is missing', async () => {
        const db = makeDb();
        db.ticket.findUnique.mockResolvedValue(null);
        await expect(makeService(db).togglePriority('missing')).rejects.toBeInstanceOf(NotFoundException);
    });
});
