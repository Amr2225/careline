import { Body, Controller, Param, Post } from '@nestjs/common';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { TicketService } from './ticket.service';
import { CallTicketDto } from './dto/queue.dto';

// Receptionist queue controls. All gated on Queue:UPDATE; doctors (Queue:READ only)
// can view the board but cannot drive it.
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService: TicketService) { }

    @Post(':id/call')
    @Requires(["Queue:UPDATE"])
    async call(@Param('id') id: string, @Body() dto: CallTicketDto) {
        return await this.ticketService.call(id, dto.doctorId);
    }

    @Post(':id/in-progress')
    @Requires(["Queue:UPDATE"])
    async markInProgress(@Param('id') id: string) {
        return await this.ticketService.markInProgress(id);
    }

    @Post(':id/done')
    @Requires(["Queue:UPDATE"])
    async markDone(@Param('id') id: string) {
        return await this.ticketService.markDone(id);
    }

    @Post(':id/skip')
    @Requires(["Queue:UPDATE"])
    async skip(@Param('id') id: string) {
        return await this.ticketService.skip(id);
    }

    @Post(':id/priority')
    @Requires(["Queue:UPDATE"])
    async togglePriority(@Param('id') id: string) {
        return await this.ticketService.togglePriority(id);
    }
}
