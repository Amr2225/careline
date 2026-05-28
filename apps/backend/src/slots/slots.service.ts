import { DbService } from '@/db/db.service';
import { SettingsService } from '@/settings/settings.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateBulkSlotsDto, CreateSlotDto } from './dto/create-slot.dto';
import { combineDateAndTime, eachDayInRange } from '@/common/date.util';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { addMinutes } from 'date-fns';
import { Prisma, AvailableSlot } from '@careline/shared/prisma/client';


@Injectable()
export class SlotsService {
    constructor(private readonly dbService: DbService, private readonly configService: ConfigService, private readonly settingsService: SettingsService) { }

    // TODO: Implement Query
    async getSlots(): Promise<AvailableSlot[]> {
        return await this.dbService.availableSlot.findMany();
    }

    async getAvailableSlots(date?: string): Promise<AvailableSlot[]> {
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');
        const dateFilter = date
            ? Prisma.sql`WHERE DATE(s."startTime" AT TIME ZONE ${timezone}) = ${date}::date`
            : Prisma.empty;

        return await this.dbService.$queryRaw<AvailableSlot[]>(Prisma.sql`
            SELECT
                s."id",
                s."startTime",
                s."capacity",
                s."templateId",
                s."createdAt"
            FROM "available_slots" s
            LEFT JOIN "appointments" a ON a."slotId" = s."id"
            ${dateFilter}
            GROUP BY s."id", s."startTime", s."capacity", s."templateId", s."createdAt"
            HAVING COUNT(a."id") < s."capacity"
            ORDER BY s."startTime" ASC
        `);
    }

    async getNextAvailableSlot(): Promise<AvailableSlot | null> {
        return await this.dbService.availableSlot.findFirst({
            where: {
                startTime: { gte: new Date() },
                bookedCount: { lt: this.dbService.availableSlot.fields.capacity }
            },
            orderBy: {
                startTime: 'asc'
            }
        })
    }

    async create(data: CreateSlotDto): Promise<AvailableSlot> {
        const settings = await this.settingsService.getAll();
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');

        const capacity = data.capacity ?? parseInt(settings.slotCapacity);
        const hours = JSON.parse(settings.clinicHours);

        const workingDay = hours[String(toZonedTime(data.startDateTime, timezone).getDay())];
        if (!workingDay) throw new BadRequestException('Cannot assign slot to a non-working day');

        return await this.dbService.availableSlot.create({
            data: {
                startTime: data.startDateTime,
                capacity
            }
        });
    }

    async deleteSlot(id: string): Promise<void> {
        await this.dbService.availableSlot.delete({ where: { id } });
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
        for (const date of eachDayInRange(from, end, timezone)) {
            if (!dto.daysOfWeek.includes(date.getDay())) continue; // TODO: Assess this

            const dayHours = hours[String(date.getDay())] // this is the working hour in that day
            if (!dayHours) continue; // Skip if the day is set to be holiday

            const dayDate = formatInTimeZone(date, timezone, "yyyy-MM-dd");
            const dayStart = combineDateAndTime(dayDate, dto.startTime, timezone);
            const dayEnd = combineDateAndTime(dayDate, dto.endTime, timezone);

            let cursor = dayStart;
            while (addMinutes(cursor, duration) <= dayEnd) { // TODO: Assess this it can be written as (isBefore(addMinutes(cursor, duration), dayEnd) || isEqual(addMinutes(cursor, duration), dayEnd))
                if (dto.lunchStartTime && dto.lunchEndTime) {
                    const lunchStartDateTime = combineDateAndTime(dayDate, dto.lunchStartTime, timezone);
                    const lunchEndDateTime = combineDateAndTime(dayDate, dto.lunchEndTime, timezone);

                    // Cursor is in the lunch time, skip to the end of the lunch time
                    if (cursor >= lunchStartDateTime && cursor <= lunchEndDateTime) {
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
