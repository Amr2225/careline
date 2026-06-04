import { eachDayInRange } from '@/common/date.util';
import { DbService } from '@/db/db.service';
import { RbacService } from '@/rbac/rbac.service';
import { Appointment, AvailableSlot, Prisma } from '@careline/shared/prisma/client';
import { SlotAndAppointments, AppointmentStatus, WeeklyAppointmentsView, AppointmentWithSlot, AppointmentDetail } from '@careline/shared/types/appointment.type';
import { Action } from '@careline/shared/types/rbac.type';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';

type SlotWithAppointments = Prisma.AvailableSlotGetPayload<{
    include: {
        appointments: {
            include: {
                patient: {
                    include: {
                        user: { select: { name: true } };
                    };
                };
            };
        };
    };
}>;

@Injectable()
export class AppointmentsService {
    constructor(private readonly dbService: DbService, private readonly configService: ConfigService, private readonly rbacService: RbacService) { }

    async getByDate(date: string): Promise<SlotAndAppointments[]> {
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');
        const baseDate = formatInTimeZone(date, timezone, "yyyy-MM-dd"); // Fromat the date Becasue it will shift the day backward

        const startOfDay = `${baseDate}T00:00:00Z`;
        const endOfDay = `${baseDate}T23:59:59Z`;

        const slots = await this.dbService.availableSlot.findMany({
            where: { startTime: { gte: startOfDay, lte: endOfDay } },
            include: { appointments: { include: { patient: { include: { user: { select: { name: true } } } } } } },
            orderBy: { startTime: 'asc' }
        })

        return slots.map((slot): SlotAndAppointments => this.mapSlotToSlotAndAppointments(slot))
    }

    private mapSlotToSlotAndAppointments(slot: SlotWithAppointments): SlotAndAppointments {
        return ({
            id: slot.id,
            time: slot.startTime.toISOString(),
            capacity: slot.capacity,
            bookedCount: slot.bookedCount,
            bookings: slot.appointments.map(appt => ({
                id: appt.id,
                patientName: appt.patient.user.name,
                patientId: appt.patient.id,
                status: appt.status as AppointmentStatus,
                bookedAt: appt.bookedAt
            }))
        })
    }

    async getByDateRange(from: string, to: string): Promise<WeeklyAppointmentsView[]> {
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');
        const baseStartDate = formatInTimeZone(from, timezone, "yyyy-MM-dd");
        const baseEndDate = formatInTimeZone(to, timezone, "yyyy-MM-dd");

        const startOfDay = `${baseStartDate}T00:00:00Z`;
        const endOfDay = `${baseEndDate}T23:59:59Z`;

        const slots = await this.dbService.availableSlot.findMany({
            where: { startTime: { gte: startOfDay, lte: endOfDay } },
            include: { appointments: { include: { patient: { include: { user: { select: { name: true } } } } } } },
            orderBy: { startTime: 'asc' }
        })

        const weekDaysList = eachDayInRange(new Date(baseStartDate), new Date(baseEndDate), timezone); // The function itself turns the UTC date to zoned DateTime
        const daysSet = new Map<string, SlotAndAppointments[]>();

        for (const slot of slots) {
            const day = formatInTimeZone(slot.startTime, timezone, "yyyy-MM-dd");
            if (!daysSet.has(day)) {
                daysSet.set(day, [this.mapSlotToSlotAndAppointments(slot)])
                continue;
            }

            const currentSavedSlots = daysSet.get(day)!;
            daysSet.set(day, [...currentSavedSlots, this.mapSlotToSlotAndAppointments(slot)]);
        }

        for (const weekDay of weekDaysList) {
            const day = formatInTimeZone(weekDay, timezone, "yyyy-MM-dd");
            if (!daysSet.has(day)) daysSet.set(day, []);
        }

        return Array.from(daysSet.entries()).map(([date, slots]) => ({
            date,
            slots
        })).sort((a, b) => a.date.localeCompare(b.date));

    }

    async getPositionForAppointment(appointmentId: string) {
        const appt = await this.dbService.appointment.findUnique({ where: { id: appointmentId }, include: { slot: true } });
        if (!appt) throw new NotFoundException('Appointment not found');

        const timezone = this.configService.getOrThrow<string>('TIMEZONE');

        if (appt.status === AppointmentStatus.CANCELLED
            || appt.status === AppointmentStatus.DONE
            || appt.status === AppointmentStatus.NO_SHOW) {
            return 0;
        }

        const dayStart = fromZonedTime(`${formatInTimeZone(appt.slot.startTime, timezone, "yyyy-MM-dd")}T00:00:00`, timezone);
        const dayEnd = fromZonedTime(`${formatInTimeZone(appt.slot.startTime, timezone, "yyyy-MM-dd")}T23:59:59`, timezone);

        // Count active appointments earlier in the day, with bookedAt tiebreak
        const aheadByAppointments = await this.dbService.appointment.count({
            where: {
                slot: { startTime: { gte: dayStart, lte: dayEnd } },
                status: { in: [AppointmentStatus.BOOKED, AppointmentStatus.ARRIVED, AppointmentStatus.IN_PROGRESS] },
                OR: [
                    { slot: { startTime: { lt: appt.slot.startTime } } },
                    {
                        slot: { startTime: appt.slot.startTime },
                        bookedAt: { lt: appt.bookedAt }
                    }
                ]
            }
        })

        const aheadByWalkin = 0;
        return aheadByAppointments + aheadByWalkin + 1;
    }

    // with Serializable transaction + FOR UPDATE
    async book(slotId: string, userId: string): Promise<Appointment> {
        console.log("USER ID: ", userId);
        const patinet = await this.dbService.patient.findUnique({ where: { userId } });
        if (!patinet) throw new NotFoundException('Patient not found');

        return await this.dbService.$transaction(async (tx) => {
            const slot = await tx.$queryRaw`
            SELECT id, capacity FROM available_slots WHERE id = ${slotId} FOR UPDATE
            ` as AvailableSlot[];

            console.log("SLOT: ", slot[0])
            if (!slot[0]) throw new NotFoundException('Slot not found');

            const currentAppointments = await tx.appointment.count({ where: { slotId, status: { in: [AppointmentStatus.BOOKED, AppointmentStatus.ARRIVED, AppointmentStatus.IN_PROGRESS] } } });
            if (currentAppointments >= slot[0].capacity) throw new ConflictException('Slot is full');

            const existing = await tx.appointment.findFirst({ where: { slotId, patientId: patinet.id, status: { not: AppointmentStatus.CANCELLED } } })
            if (existing) throw new ConflictException('Already booked this slot');

            await tx.availableSlot.update({ where: { id: slotId }, data: { bookedCount: currentAppointments + 1 } });
            return tx.appointment.create({ data: { slotId, patientId: patinet.id, status: AppointmentStatus.BOOKED } });
        }, { isolationLevel: "Serializable" })

    }

    // with permission check
    async cancel(appointmentId: string, callerUserId: string) {
        const appt = await this.dbService.appointment.findUnique({ where: { id: appointmentId }, include: { patient: { include: { user: true } }, slot: true } })
        if (!appt) throw new NotFoundException('Appointment not found');

        if (appt.status === "CANCELLED") throw new BadRequestException('Appointment already cancelled');
        if (appt.status === AppointmentStatus.DONE || appt.status === AppointmentStatus.NO_SHOW) throw new BadRequestException('Cannot cancel a completed appointment');

        // if not patient is calling this endpoint
        if (appt.patient.user.id !== callerUserId) {
            const hasPermission = await this.rbacService.hasPermission(callerUserId, 'Appointments', Action.UPDATE);
            if (!hasPermission) throw new ForbiddenException('You are not allowed to cancel this appointment');
        }

        return await this.dbService.$transaction(async (tx) => {
            await tx.availableSlot.update({ where: { id: appt.slotId }, data: { bookedCount: appt.slot.bookedCount - 1 } });
            return await tx.appointment.update({ where: { id: appointmentId }, data: { status: AppointmentStatus.CANCELLED, cancelledAt: new Date() } });
        }, { isolationLevel: "Serializable" })
    }

    // Patient Own Appointments
    async getMine(callerUserId: string): Promise<AppointmentWithSlot[]> {
        return await this.dbService.appointment.findMany({
            where: { patient: { user: { id: callerUserId } } },
            include: { slot: true }
        }) as AppointmentWithSlot[];
    }

    // with own-or-staff check
    async getById(appointmentId: string, callerUserId: string): Promise<AppointmentDetail> {
        const appt = await this.dbService.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                patient: { include: { user: true } },
                slot: true
            }
        })
        if (!appt) throw new NotFoundException('Appointment not found');

        // This checks if the caller is the patient or a staff member
        // the user.id will match the callerUserId only if the patient is the one making the request
        if (appt.patient.user.id !== callerUserId) {
            const hasPermission = await this.rbacService.hasPermission(callerUserId, 'Appointments', Action.UPDATE);
            if (!hasPermission) throw new ForbiddenException('You are not allowed to cancel this appointment');
        }

        const patientPosition = await this.getPositionForAppointment(appointmentId);

        return {
            id: appt.id,
            patientId: appt.patient.id,
            slotId: appt.slotId,
            slot: appt.slot,
            status: appt.status as AppointmentStatus,
            bookedAt: appt.bookedAt,
            position: patientPosition,
            cancelledAt: appt.cancelledAt,
            updatedAt: appt.updatedAt,
        }
    }
}
