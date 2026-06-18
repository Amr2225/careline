import { Module } from '@nestjs/common';
import { ArrivalService } from './arrival.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';
import { ArrivalCron } from './arrival.cron';

@Module({
  imports: [DbModule, RbacModule],
  providers: [ArrivalService, ArrivalCron],
  exports: [ArrivalService]
})
export class ArrivalModule { }
