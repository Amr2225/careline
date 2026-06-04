import { DbService } from '@/db/db.service';
import { SettingsService } from '@/settings/settings.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SlotTemplate } from '@careline/shared/prisma/client';
import { combineDateAndTime, nextWeekday } from '@/common/date.util';
import { ConfigService } from '@nestjs/config';
import { formatInTimeZone } from 'date-fns-tz';
import { addMinutes } from 'date-fns';
import { CreateTemplateDto } from './dto/create-template.dto';
import { SlotTemplateEntity } from '@careline/shared/types/slot-templates.type';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { skipUndefined } from '@/common/skipUndefined.utils';

@Injectable()
export class SlotTemplatesService {
    constructor(
        private readonly dbService: DbService,
        private readonly settingsService: SettingsService,
        private readonly configService: ConfigService,
    ) { }

    async list(): Promise<SlotTemplateEntity[]> {
        const templates = await this.dbService.slotTemplate.findMany({
            include: { _count: { select: { slots: true } } },
            orderBy: { createdAt: 'desc' }
        })

        return templates.map(({ _count, ...template }) => ({
            ...template,
            generatedSlots: _count.slots,
        }))
    }

    async getById(id: string): Promise<SlotTemplateEntity> {
        const template = await this.dbService.slotTemplate.findUnique({ where: { id }, include: { _count: { select: { slots: true } } } });
        if (!template) throw new NotFoundException('Slot template not found');
        const { _count, ...templateWithoutCount } = template

        return {
            ...templateWithoutCount,
            generatedSlots: _count.slots
        }
    }

    async create(templateData: CreateTemplateDto): Promise<SlotTemplate> {
        return await this.dbService.slotTemplate.create({
            data: {
                ...templateData,
                capacityOverride: skipUndefined(templateData.capacityOverride),
                isActive: skipUndefined(templateData.isActive)
            }
        });
    }

    async update(templateId: string, templateData: UpdateTemplateDto): Promise<SlotTemplateEntity> {
        try {
            const template = await this.dbService.slotTemplate.update({
                where: { id: templateId },
                data: {
                    name: skipUndefined(templateData.name),
                    weekday: skipUndefined(templateData.weekday),
                    startTime: skipUndefined(templateData.startTime),
                    endTime: skipUndefined(templateData.endTime),
                    capacityOverride: skipUndefined(templateData.capacityOverride),
                    isActive: skipUndefined(templateData.isActive)
                },
                include: { _count: { select: { slots: true } } }
            });

            const { _count, ...templateWithoutCount } = template

            return {
                ...templateWithoutCount,
                generatedSlots: _count.slots
            }

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Slot template not found');
            }

            throw error;
        }
    }

    async delete(templateId: string): Promise<boolean> {
        try {
            await this.dbService.slotTemplate.delete({ where: { id: templateId } });
            return true;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Slot template not found');
            }

            throw error;
        }
    }

    async materialize(templateId: string, fromDate: Date, weeks: number): Promise<any> {
        const template = await this.dbService.slotTemplate.findUnique({ where: { id: templateId, isActive: true } })
        if (!template) throw new NotFoundException('Slot template not found');

        const timezone = this.configService.getOrThrow<string>('TIMEZONE');
        const settings = await this.settingsService.getAll();
        const duration = parseInt(settings.appointmentDurationMinutes);
        const defaultCapacity = parseInt(settings.slotCapacity);
        const workingDays = JSON.parse(settings.clinicHours); // TODO: Setting the slots needs to check the working hours and days?
        const capacity = template.capacityOverride ?? defaultCapacity;

        const slotsToCreate: Prisma.AvailableSlotCreateManyInput[] = [];

        for (let w = 0; w < weeks; w++) {
            const targetDay = nextWeekday(fromDate, template.weekday, w, timezone);
            const workingday = workingDays[String(targetDay.getDay())];
            if (!workingday) continue;

            const dayDate = formatInTimeZone(targetDay, timezone, "yyyy-MM-dd");
            let cursor = combineDateAndTime(dayDate, template.startTime, timezone);
            const end = combineDateAndTime(dayDate, template.endTime, timezone);

            while (addMinutes(cursor, duration) <= end) { // TODO: Assess this it can be written as (isBefore(addMinutes(cursor, duration), end) || isEqual(addMinutes(cursor, duration), end))
                slotsToCreate.push({ startTime: cursor, capacity, templateId });
                cursor = addMinutes(cursor, duration);
            }

        }

        await this.dbService.slotTemplate.update({ where: { id: templateId }, data: { lastRunAt: new Date() } });
        return await this.dbService.availableSlot.createMany({ data: slotsToCreate, skipDuplicates: true });
    }
}
