import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';

@Module({
    imports: [DbModule, RbacModule],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule { }
