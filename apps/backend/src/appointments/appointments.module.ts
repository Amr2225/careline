import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';

@Module({
  imports: [DbModule, RbacModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule { }
