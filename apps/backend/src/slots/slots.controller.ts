import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { AvailableSlot } from '@careline/shared/prisma/client';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { QueryAvailableSlotsDto } from './dto/query-available-slots.dto';
import { CreateBulkSlotsDto, CreateSlotDto } from './dto/create-slot.dto';
import { ValidateWorkingHours } from './pipe/validate-workinghours.pipe';

@Controller('slots')
export class SlotsController {
    constructor(private readonly slotsService: SlotsService) { }

    @Get()
    @Requires(["Appointments:READ"])
    async getSlots(): Promise<AvailableSlot[]> {
        return await this.slotsService.getSlots();
    }

    @Get("available")
    @Requires(["Appointments:READ"])
    async getAvailableSlots(@Query() query: QueryAvailableSlotsDto): Promise<AvailableSlot[]> {
        return await this.slotsService.getAvailableSlots(query.date);
    }

    @Get("next-available")
    @Requires(["Appointments:READ"])
    async getNextAvailableSlot(): Promise<AvailableSlot | null> {
        return await this.slotsService.getNextAvailableSlot();
    }

    @Post()
    @Requires(["Appointments:WRITE"])
    async createSlot(@Body(ValidateWorkingHours) createSlotDto: CreateSlotDto): Promise<AvailableSlot> {
        return await this.slotsService.create(createSlotDto);
    }

    @Post("bulk")
    @HttpCode(HttpStatus.CREATED)
    @Requires(["Appointments:WRITE"])
    async createBulkSlots(@Body() createSlotDto: CreateBulkSlotsDto) {
        await this.slotsService.createBulk(createSlotDto);
        return { message: "Slots created successfully" };
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @Requires(["Appointments:DELETE"])
    async deleteSlot(@Param('id') id: string) {
        await this.slotsService.deleteSlot(id);
        return { message: "Slot deleted successfully" };
    }

}
