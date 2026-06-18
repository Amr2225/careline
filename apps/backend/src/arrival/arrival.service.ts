import { DbService } from '@/db/db.service';
import { RbacService } from '@/rbac/rbac.service';
import { LateArrivalBucket } from '@careline/shared/prisma/index';
import { AppointmentWithSlot } from '@careline/shared/types/appointment.type';
import { Action } from '@careline/shared/types/rbac.type';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FRONT_INSERT_GRACE_MINUTES } from './arrival.constants';

@Injectable()
export class ArrivalService {
    constructor(private readonly dbService: DbService, private readonly rbacService: RbacService) { }

    async recordArrival(appointmentId: string, callerUserId: string): Promise<AppointmentWithSlot> {
        const appt = await this.dbService.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                patient: { include: { user: true } },
                slot: true
            }
        });

        if (!appt) throw new NotFoundException('Appointment not found');

        const isOwnArrival = appt.patient.user.id === callerUserId;
        if (!isOwnArrival) {
            const hasPermission = await this.rbacService.hasPermission(callerUserId, "Appointments", Action.UPDATE);
            if (!hasPermission) throw new ForbiddenException("You are not allowed to record arrival for this appointment (You don't have enough permissions)");
        }

        if (appt.status === "ARRIVED" || appt.status === "IN_PROGRESS" || appt.status === "DONE") throw new BadRequestException("Appointment already arrived or in progress");
        if (appt.status === "NO_SHOW") throw new BadRequestException("Appointment marked as no-showed");
        if (appt.status === "CANCELLED") throw new BadRequestException("Appointment was cancelled");

        const now = new Date();
        const slotTime = appt.slot.startTime;
        const minutesPastSlot = (now.getTime() - slotTime.getTime()) / 60_000; // Convert milliseconds into minutes

        let bucket: LateArrivalBucket;
        if (appt.status === "BOOKED") {
            bucket = "ON_TIME"
        }
        else if (appt.status === "LATE_ARRIVING") {
            if (minutesPastSlot <= FRONT_INSERT_GRACE_MINUTES) bucket = "FRONT_INSERT"
            else bucket = "VERY_LATE"
        } else {
            throw new BadRequestException(`Unexpected status: ${appt.status}`);
        }


        return await this.dbService.$transaction(async (tx) => {
            const updated = await tx.appointment.update({
                where: { id: appointmentId },
                data: {
                    status: "ARRIVED",
                    arrivedAt: now,
                    lateArrival: bucket,
                },
                include: { slot: true }
            })

            // Phase 6:  Create Ticket based on bucket
            // await this.ticketService.createFromAppointment(tx, updated);
            return updated;
        }) as AppointmentWithSlot
    }

    async markNoShow(appointmentId: string, markedById: string): Promise<AppointmentWithSlot> {
        const appt = await this.dbService.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                patient: { include: { user: true } },
                slot: true
            }
        });

        if (!appt) throw new NotFoundException('Appointment not found');

        if (appt.status === "ARRIVED" || appt.status === "IN_PROGRESS" || appt.status === "DONE") throw new BadRequestException("Appointment already arrived or in progress");
        if (appt.status === "NO_SHOW") throw new BadRequestException("Appointment marked as no-showed");
        if (appt.status === "CANCELLED") throw new BadRequestException("Appointment was cancelled");

        // At this point the appointment is guaranteed to be BOOKED or LATE_ARRIVING,
        // both of which count against the slot's capacity, so free one seat.
        return await this.dbService.$transaction(async (tx) => {
            const updated = await tx.appointment.update({
                where: { id: appointmentId },
                data: {
                    status: "NO_SHOW",
                    noShowAt: new Date(),
                    noShowMarkedById: markedById,
                },
                include: { slot: true }
            });

            await tx.availableSlot.update({
                where: { id: appt.slotId },
                data: { bookedCount: { decrement: 1 } }
            });

            return updated;
        }) as AppointmentWithSlot
    }
}
