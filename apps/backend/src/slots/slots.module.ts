import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';
import { SettingsService } from '@/settings/settings.service';

@Module({
  imports: [DbModule, RbacModule],
  controllers: [SlotsController],
  providers: [SlotsService, SettingsService]
})
export class SlotsModule { }
