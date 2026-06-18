import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import type { Prisma } from '@careline/shared/prisma/client';
import type { TicketStatus } from '@careline/shared/prisma/index';
import type { QueueTicket, MyTicket } from '@careline/shared/types/ticket.type';
import { SYSTEM_ROLES } from '@careline/shared/types/rbac.type';
import { DbService } from '@/db/db.service';
import { RbacService } from '@/rbac/rbac.service';
import { QueueOrderingService } from './queue-ordering.service';
import { ACTIVE_TICKET_STATUSES, BLOCKING_APPOINTMENT_STATUSES } from './queue.constants';

// Ticket plus the relations the board needs for names.
type TicketWithNames = Prisma.TicketGetPayload<{
    include: { patient: { include: { user: { select: { name: true } } } }; assignedDoctor: { select: { name: true } } };
}>;

const NAME_INCLUDE = {
    patient: { include: { user: { select: { name: true } } } },
    assignedDoctor: { select: { name: true } },
} as const;

// An appointment carrying the fields createFromAppointment denormalizes onto its ticket.
type ArrivedAppointment = Prisma.AppointmentGetPayload<{ include: { slot: true } }>;

@Injectable()
export class TicketService {
    constructor(
        private readonly dbService: DbService,
        private readonly rbacService: RbacService,
        private readonly configService: ConfigService,
        private readonly orderingService: QueueOrderingService,
    ) { }

    // Phase 5b arrival hook: materialize a queue ticket for an appointment that just
    // arrived. Runs inside the arrival transaction, so it takes the tx client.
    async createFromAppointment(tx: Prisma.TransactionClient, appointment: ArrivedAppointment) {
        return await tx.ticket.create({
            data: {
                patientId: appointment.patientId,
                sourceType: 'APPOINTMENT',
                appointmentId: appointment.id,
                lateArrivalBucket: appointment.lateArrival,
                scheduledSlotTime: appointment.slot.startTime,
            },
        });
    }

    async createFromWalkIn(callerUserId: string): Promise<{ ticketId: string; position: number }> {
        const patient = await this.dbService.patient.findUnique({ where: { userId: callerUserId } });
        if (!patient) throw new ForbiddenException('Only patients can join the walk-in queue.');

        await this.assertNoExistingQueueSpot(patient.id);

        const ticket = await this.dbService.ticket.create({
            data: { patientId: patient.id, sourceType: 'WALK_IN' },
        });

        const position = await this.positionOf(ticket.id);
        return { ticketId: ticket.id, position };
    }

    async call(ticketId: string, doctorId: string): Promise<TicketWithNames> {
        const ticket = await this.getTicketOrThrow(ticketId);
        this.assertStatus(ticket, 'WAITING');
        await this.assertActiveDoctor(doctorId);

        return await this.dbService.ticket.update({
            where: { id: ticketId },
            data: { status: 'CALLED', assignedDoctorId: doctorId, calledAt: new Date() },
            include: NAME_INCLUDE,
        });
    }

    async markInProgress(ticketId: string): Promise<TicketWithNames> {
        const ticket = await this.getTicketOrThrow(ticketId);
        this.assertStatus(ticket, 'CALLED');
        if (!ticket.assignedDoctorId) throw new BadRequestException('Ticket has no assigned doctor.');

        const doctorBusy = await this.dbService.ticket.count({
            where: { assignedDoctorId: ticket.assignedDoctorId, status: 'IN_PROGRESS' },
        });
        if (doctorBusy > 0) throw new ConflictException('That doctor is already seeing a patient.');

        return await this.dbService.ticket.update({
            where: { id: ticketId },
            data: { status: 'IN_PROGRESS', inProgressAt: new Date() },
            include: NAME_INCLUDE,
        });
    }

    async markDone(ticketId: string): Promise<TicketWithNames> {
        const ticket = await this.getTicketOrThrow(ticketId);
        this.assertStatus(ticket, 'IN_PROGRESS');

        return await this.dbService.$transaction(async (tx) => {
            const updated = await tx.ticket.update({
                where: { id: ticketId },
                data: { status: 'DONE', doneAt: new Date() },
                include: NAME_INCLUDE,
            });
            // Keep the linked appointment in sync so day stats and history agree.
            if (updated.appointmentId) {
                await tx.appointment.update({ where: { id: updated.appointmentId }, data: { status: 'DONE' } });
            }
            return updated;
        });
    }

    // Skip re-queues the same row at the back of its bucket (bumps joinedQueueAt),
    // keeping the appointment link and ticket history intact.
    async skip(ticketId: string): Promise<TicketWithNames> {
        const ticket = await this.getTicketOrThrow(ticketId);
        this.assertStatus(ticket, 'CALLED');

        return await this.dbService.ticket.update({
            where: { id: ticketId },
            data: {
                status: 'WAITING',
                assignedDoctorId: null,
                calledAt: null,
                skippedAt: new Date(),
                joinedQueueAt: new Date(),
                skipCount: { increment: 1 },
            },
            include: NAME_INCLUDE,
        });
    }

    async togglePriority(ticketId: string): Promise<TicketWithNames> {
        const ticket = await this.getTicketOrThrow(ticketId);
        return await this.dbService.ticket.update({
            where: { id: ticketId },
            data: { priority: !ticket.priority },
            include: NAME_INCLUDE,
        });
    }

    async getLiveQueue(): Promise<QueueTicket[]> {
        const ordered = await this.activeTicketsOrdered();
        return ordered.map((ticket, index) => this.toQueueTicket(ticket, index + 1));
    }

    async getMyTicket(callerUserId: string): Promise<MyTicket | null> {
        const ordered = await this.activeTicketsOrdered();
        const index = ordered.findIndex((ticket) => ticket.patient.userId === callerUserId);
        if (index === -1) return null;

        const ticket = ordered[index];
        return {
            id: ticket.id,
            status: ticket.status,
            priority: ticket.priority,
            position: index + 1,
            joinedQueueAt: ticket.joinedQueueAt,
        };
    }

    async getDoctorView(doctorUserId: string): Promise<{ current: QueueTicket | null; upNext: QueueTicket[] }> {
        const ordered = await this.activeTicketsOrdered();
        const board = ordered.map((ticket, index) => this.toQueueTicket(ticket, index + 1));

        const current = board.find((t) => t.assignedDoctorId === doctorUserId && t.status === 'IN_PROGRESS') ?? null;
        const upNext = board.filter((t) => t.status !== 'IN_PROGRESS');
        return { current, upNext };
    }

    private async activeTicketsOrdered(): Promise<TicketWithNames[]> {
        const tickets = await this.dbService.ticket.findMany({
            where: { status: { in: ACTIVE_TICKET_STATUSES } },
            include: NAME_INCLUDE,
        });
        return this.orderingService.order(tickets);
    }

    private async positionOf(ticketId: string): Promise<number> {
        const ordered = await this.activeTicketsOrdered();
        return ordered.findIndex((ticket) => ticket.id === ticketId) + 1;
    }

    private toQueueTicket(ticket: TicketWithNames, position: number): QueueTicket {
        return {
            id: ticket.id,
            patientId: ticket.patientId,
            patientName: ticket.patient.user.name,
            sourceType: ticket.sourceType,
            status: ticket.status,
            priority: ticket.priority,
            lateArrivalBucket: ticket.lateArrivalBucket,
            assignedDoctorId: ticket.assignedDoctorId,
            assignedDoctorName: ticket.assignedDoctor?.name ?? null,
            joinedQueueAt: ticket.joinedQueueAt,
            position,
        };
    }

    private async getTicketOrThrow(ticketId: string) {
        const ticket = await this.dbService.ticket.findUnique({ where: { id: ticketId } });
        if (!ticket) throw new NotFoundException('Ticket not found');
        return ticket;
    }

    private assertStatus(ticket: { status: TicketStatus }, expected: TicketStatus): void {
        if (ticket.status !== expected) {
            throw new BadRequestException(`Ticket must be ${expected}, but is ${ticket.status}.`);
        }
    }

    private async assertActiveDoctor(doctorId: string): Promise<void> {
        const doctor = await this.dbService.user.findUnique({ where: { id: doctorId } });
        if (!doctor || !doctor.isActive) throw new BadRequestException('Assigned doctor is not an active user.');

        const roles = await this.rbacService.getRoles(doctorId);
        const isDoctor = roles.some((role) => role.name === SYSTEM_ROLES.DOCTOR);
        if (!isDoctor) throw new BadRequestException('Assigned user does not hold the Doctor role.');
    }

    private async assertNoExistingQueueSpot(patientId: string): Promise<void> {
        const activeTicket = await this.dbService.ticket.findFirst({
            where: { patientId, status: { in: ACTIVE_TICKET_STATUSES } },
        });
        if (activeTicket) throw new ConflictException('You are already in the queue.');

        const { dayStart, dayEnd } = this.todayBounds();
        const blockingAppointment = await this.dbService.appointment.findFirst({
            where: {
                patientId,
                status: { in: BLOCKING_APPOINTMENT_STATUSES },
                slot: { startTime: { gte: dayStart, lte: dayEnd } },
            },
        });
        if (blockingAppointment) {
            throw new ConflictException('You already have an appointment in progress today.');
        }
    }

    private todayBounds(): { dayStart: Date; dayEnd: Date } {
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');
        const today = formatInTimeZone(new Date(), timezone, 'yyyy-MM-dd');
        return {
            dayStart: fromZonedTime(`${today}T00:00:00`, timezone),
            dayEnd: fromZonedTime(`${today}T23:59:59.999`, timezone),
        };
    }
}
