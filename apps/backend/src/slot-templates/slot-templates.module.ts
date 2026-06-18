import { Module } from '@nestjs/common';
import { SlotTemplatesController } from './slot-templates.controller';
import { SlotTemplatesService } from './slot-templates.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';
import { SettingsService } from '@/settings/settings.service';
import { SlotTemplatesCron } from './slot-templates.cron';

@Module({
  imports: [DbModule, RbacModule],
  controllers: [SlotTemplatesController],
  providers: [SlotTemplatesService, SettingsService, SlotTemplatesCron]
})
export class SlotTemplatesModule { }
