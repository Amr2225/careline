import { DbService } from '@/db/db.service';
import { SettingsService } from '@/settings/settings.service';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateBulkSlotsDto, CreateSlotDto } from './dto/create-slot.dto';
import { combineDateAndTime, eachDayInRange } from '@/common/date.util';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { addMinutes } from 'date-fns';
import { Prisma, AvailableSlot } from '@careline/shared/prisma/client';
import { SlotWithProjectedPosition, SlotWithTemplateName } from '@careline/shared/types/slots.type';
import { QuerySlotsDto } from './dto/query-slots.dto';
import { AppointmentStatus } from '@careline/shared/prisma/index';

@Injectable()
export class SlotsService {
    constructor(private readonly dbService: DbService,
        private readonly configService: ConfigService,
        private readonly settingsService: SettingsService,
    ) { }

    async getSlots(query: QuerySlotsDto): Promise<SlotWithTemplateName[]> {
        const { from, to } = query;

        return await this.dbService.availableSlot.findMany({
            where: { startTime: { gte: from, lte: to } },
            include: { template: { select: { name: true } } }
        });
    }

    async getAvailableSlots(date?: string): Promise<SlotWithProjectedPosition[]> {
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');
        const baseDate = formatInTimeZone(date ?? new Date(), timezone, "yyyy-MM-dd");
        const startOfDay = `${baseDate}T00:00:00Z`;
        const endOfDay = `${baseDate}T23:59:59Z`;

        const slots = await this.dbService.availableSlot.findMany({
            where: {
                startTime: { gte: startOfDay, lte: endOfDay },
                bookedCount: { lt: this.dbService.availableSlot.fields.capacity }
            },
            include: {
                appointments: true
            },
            orderBy: {
                startTime: 'asc'
            }
        })

        return slots.map((slot, index) => ({
            ...slot,
            projectedPosition: slots.slice(0, index - slots.length).reduce((acc, curr) => acc + curr.capacity, 0) + 1
        }))
    }

    async getNextAvailableSlot(): Promise<SlotWithProjectedPosition | null> {
        const slot = await this.dbService.availableSlot.findFirst({
            where: {
                startTime: { gte: new Date() },
                bookedCount: { lt: this.dbService.availableSlot.fields.capacity }
            },
            orderBy: {
                startTime: 'asc'
            }
        })

        if (!slot) return null;

        const previousSlots = await this.dbService.availableSlot.findMany({
            where: {
                startTime: { lt: slot.startTime, gte: `${formatInTimeZone(slot.startTime, 'UTC', 'yyyy-MM-dd')}T00:00:00Z` },
                bookedCount: { lt: this.dbService.availableSlot.fields.capacity }
            },
            orderBy: { startTime: 'asc' }
        })

        const projectedPosition = previousSlots.reduce((acc, curr) => acc + curr.capacity, 0) + slot.bookedCount + 1;

        return {
            ...slot,
            projectedPosition
        }
    }

    async create(data: CreateSlotDto): Promise<AvailableSlot> {
        const settings = await this.settingsService.getAll();
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');

        const capacity = data.capacity ?? parseInt(settings.slotCapacity);
        const hours = JSON.parse(settings.clinicHours);

        const workingDay = hours[String(toZonedTime(data.startDateTime, timezone).getDay())];
        if (!workingDay) throw new BadRequestException('Cannot assign slot to a non-working day');

        try {

            return await this.dbService.availableSlot.create({
                data: {
                    startTime: data.startDateTime,
                    capacity
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Slot with the same time already exists');
            }
            throw error;
        }
    }

    async deleteSlot(id: string): Promise<void> {
        const slot = await this.dbService.availableSlot.findUnique({ where: { id }, include: { appointments: true } });
        if (!slot) throw new NotFoundException('Slot not found');

        const allowedToDeleteStatuses: AppointmentStatus[] = ['NO_SHOW', 'CANCELLED'];
        if (slot.appointments.some(appointment => !allowedToDeleteStatuses.includes(appointment.status))) throw new BadRequestException('Cannot delete slot with active appointments');

        await this.dbService.$transaction(async (tx) => {
            await tx.appointment.deleteMany({ where: { slotId: id } });
            await tx.availableSlot.delete({ where: { id } });
        }, { isolationLevel: "Serializable" });
    }

    async createBulk(dto: CreateBulkSlotsDto): Promise<any> {
        const settings = await this.settingsService.getAll();

        const duration = parseInt(settings.appointmentDurationMinutes);
        const capacity = dto.capacity ?? parseInt(settings.slotCapacity);
        const hours = JSON.parse(settings.clinicHours);
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');

        const slotsToCreate: Prisma.AvailableSlotCreateManyInput[] = [];

        const from = fromZonedTime(dto.startDate, timezone);
        const end = fromZonedTime(dto.endDate, timezone);
        const daysOfWeek = eachDayInRange(from, end, timezone);
        console.log(daysOfWeek);
        for (const date of daysOfWeek) {
            if (!dto.daysOfWeek.includes(date.getDay())) continue; // TODO: Assess this

            const dayHours = hours[String(date.getDay())] // this is the working hour in that day
            if (!dayHours) continue; // Skip if the day is set to be holiday

            const dayDate = formatInTimeZone(date, timezone, "yyyy-MM-dd");
            const dayStart = combineDateAndTime(dayDate, dto.startTime, timezone);
            const dayEnd = combineDateAndTime(dayDate, dto.endTime, timezone);

            let cursor = dayStart;
            while (addMinutes(cursor, duration) <= dayEnd) { // TODO: Assess this it can be written as (isBefore(addMinutes(cursor, duration), dayEnd) || isEqual(addMinutes(cursor, duration), dayEnd))
                // console.log("cursor", cursor);
                if (dto.lunchStartTime && dto.lunchEndTime) {
                    const lunchStartDateTime = combineDateAndTime(dayDate, dto.lunchStartTime, timezone);
                    const lunchEndDateTime = combineDateAndTime(dayDate, dto.lunchEndTime, timezone);

                    // Cursor is in the lunch time, skip to the end of the lunch time
                    if (cursor >= lunchStartDateTime && cursor < lunchEndDateTime) {
                        cursor = lunchEndDateTime;
                        continue;
                    }
                }

                slotsToCreate.push({ startTime: cursor, capacity });
                cursor = addMinutes(cursor, duration);
            }
        }

        return await this.dbService.availableSlot.createMany({ data: slotsToCreate, skipDuplicates: true });
    }
}
