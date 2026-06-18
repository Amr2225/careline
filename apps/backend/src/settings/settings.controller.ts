import { Settings } from '@careline/shared/types/settings.types';
import { Setting as PrismaSettingType } from '@careline/shared/prisma/client';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { UpdateSettingDto } from './dto/update-settings.dto';
import { User } from '@/auth/decorators/user.decorator';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get()
    @Requires(["Settings:READ"])
    async getAll(): Promise<Settings> {
        return this.settingsService.getAll();
    }

    @Patch()
    @Requires(["Settings:UPDATE"])
    async update(@User() user: UserWithoutPassword, @Body() updateSettingDto: UpdateSettingDto): Promise<PrismaSettingType> {
        return this.settingsService.update(updateSettingDto, user.id);
    }
}
