import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';
import { ArrivalModule } from '@/arrival/arrival.module';

@Module({
  imports: [DbModule, RbacModule, ArrivalModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule { }
