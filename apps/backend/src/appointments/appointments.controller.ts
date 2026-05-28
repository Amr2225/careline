import { Requires } from '@/rbac/decorator/requires.decorator';
import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';
import { User } from '@/auth/decorators/user.decorator';
import { QueryAppointmentsByDateDto } from './dto/query-appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { SlotAndAppointments, WeeklyAppointmentsView } from '@careline/shared/types/appointment.type';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Get("/by-date")
    @Requires(["Appointments:READ"])
    async getAppointmentsByDate(@Query() query: QueryAppointmentsByDateDto): Promise<SlotAndAppointments[]> {
        return await this.appointmentsService.getByDate(query.from);
    }

    @Get("/by-date-range")
    @Requires(["Appointments:READ"])
    async getAppointmentsByDateRange(@Query() query: QueryAppointmentsByDateDto): Promise<WeeklyAppointmentsView[]> {
        return await this.appointmentsService.getByDateRange(query.from, query.to!);
    }

    @Get("/me")
    @Requires(["Appointments:READ"])
    async getAppointments(@User() callerUser: UserWithoutPassword) {
        return await this.appointmentsService.getMine(callerUser.id);
    }

    @Get(":id")
    @Requires(["Appointments:READ"])
    async getAppointmentById(@Param('id') apptId: string, @User() callerUser: UserWithoutPassword) {
        return await this.appointmentsService.getById(apptId, callerUser.id);
    }

    @Post()
    @Requires(["Appointments:WRITE"])
    async createAppointment(@User() callerUser: UserWithoutPassword, @Body() createAppointmentDto: CreateAppointmentDto) {
        return await this.appointmentsService.book(createAppointmentDto.slotId, createAppointmentDto.patientId ?? callerUser.id);
    }

    @Delete(":id")
    @Requires(["Appointments:UPDATE"])
    async cancelAppointment(@Param('id') apptId: string, @User() callerUser: UserWithoutPassword) {
        return await this.appointmentsService.cancel(apptId, callerUser.id);
    }
}
