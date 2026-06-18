import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';
import { SettingsService } from '@/settings/settings.service';
import { QueueController } from './queue.controller';
import { TicketsController } from './tickets.controller';
import { TicketService } from './ticket.service';
import { QrService } from './qr.service';
import { QueueOrderingService } from './queue-ordering.service';
import { WalkInCapacityService } from './walk-in-capacity.service';

@Module({
  imports: [DbModule, RbacModule, JwtModule],
  controllers: [QueueController, TicketsController],
  providers: [TicketService, QrService, QueueOrderingService, WalkInCapacityService, SettingsService],
  exports: [TicketService], // ArrivalModule materializes tickets on arrival
})
export class QueueModule { }
