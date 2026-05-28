import { DbService } from '@/db/db.service';
import { Settings } from '@careline/shared/types/serttings.types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-settings.dto';
import { Setting as PrismaSettingType } from '@careline/shared/prisma/client';

@Injectable()
export class SettingsService {
    constructor(private readonly dbService: DbService) { }

    async getAll(): Promise<Settings> {
        const currentSettings = await this.dbService.setting.findMany();
        const payload: Settings = {
            appointmentDurationMinutes: "",
            slotCapacity: "",
            clinicHours: ""
        };

        for (let setting of currentSettings) {
            payload[setting.key] = setting.value
        }

        return payload;
    }

    async get(key: string): Promise<string> {
        const setting = await this.dbService.setting.findUnique({ where: { key } });
        if (!setting) throw new NotFoundException(`Setting ${key} not found`);

        return setting.value;
    }

    async update(updateSettingDto: UpdateSettingDto, updatedById: string): Promise<PrismaSettingType> {
        const key = updateSettingDto.key;
        const value = updateSettingDto.value;

        return await this.dbService.setting.upsert({
            where: { key },
            update: { value, updatedById },
            create: { key, value, updatedById }
        });
    }
}
