import { Module } from '@nestjs/common';
import { ArrivalService } from './arrival.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';
import { ArrivalCron } from './arrival.cron';
import { QueueModule } from '@/queue/queue.module';

@Module({
  imports: [DbModule, RbacModule, QueueModule],
  providers: [ArrivalService, ArrivalCron],
  exports: [ArrivalService]
})
export class ArrivalModule { }
