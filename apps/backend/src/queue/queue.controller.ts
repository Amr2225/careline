import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { User } from '@/auth/decorators/user.decorator';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';
import { MyTicket, QrTokenResponse, QueueTicket } from '@careline/shared/types/ticket.type';
import { TicketService } from './ticket.service';
import { QrService } from './qr.service';
import { WalkInCapacityService } from './walk-in-capacity.service';
import { WalkInCheckInDto } from './dto/queue.dto';

@Controller('queue')
export class QueueController {
    constructor(
        private readonly ticketService: TicketService,
        private readonly qrService: QrService,
        private readonly capacityService: WalkInCapacityService,
    ) { }

    @Get()
    @Requires(["Queue:READ"])
    async getLiveQueue(): Promise<QueueTicket[]> {
        return await this.ticketService.getLiveQueue();
    }

    @Get('qr')
    @Requires(["Queue:READ"])
    async getCheckInQr(): Promise<QrTokenResponse> {
        return await this.qrService.buildCheckInQr();
    }

    @Get('doctor')
    @Requires(["Queue:READ"])
    async getDoctorView(@User() user: UserWithoutPassword) {
        return await this.ticketService.getDoctorView(user.id);
    }

    // Patient-own routes. The Patient role holds only Queue:WRITE, so both the
    // check-in (a write) and the patient's own-ticket lookup are gated on it.
    @Get('my-ticket')
    @Requires(["Queue:WRITE"])
    async getMyTicket(@User() user: UserWithoutPassword): Promise<MyTicket | null> {
        return await this.ticketService.getMyTicket(user.id);
    }

    @Post('walk-in')
    @Requires(["Queue:WRITE"])
    async walkIn(@User() user: UserWithoutPassword, @Body() dto: WalkInCheckInDto): Promise<{ ticketId: string; position: number }> {
        await this.qrService.verifyCheckInToken(dto.token);

        const capacity = await this.capacityService.check();
        if (!capacity.allowed) throw new ConflictException(capacity.reason);

        return await this.ticketService.createFromWalkIn(user.id);
    }
}
