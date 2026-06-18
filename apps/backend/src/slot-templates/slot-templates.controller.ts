import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { SlotTemplatesService } from './slot-templates.service';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { SlotTemplateEntity } from '@careline/shared/types/slot-templates.type';
import { CreateTemplateDto } from './dto/create-template.dto';
import { SlotTemplate } from '@careline/shared/prisma/index';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { MaterializeTemplateDto } from './dto/materialize-template.dto';
import { ValidateWorkingHours } from './pipe/validate-workinghours.pipe';

@Controller('slot-templates')
export class SlotTemplatesController {
    constructor(private readonly slotTemplatesService: SlotTemplatesService) { }

    @Get()
    @Requires(["Appointments:READ"])
    async getSlotTemplates(): Promise<SlotTemplateEntity[]> {
        return await this.slotTemplatesService.list();
    }

    @Get(":id")
    @Requires(["Appointments:READ"])
    async getSlotTemplateById(@Param('id') id: string): Promise<SlotTemplateEntity> {
        return await this.slotTemplatesService.getById(id);
    }

    @Post()
    @Requires(["Appointments:WRITE"])
    async createSlotTemplate(@Body(ValidateWorkingHours) createSlotTemplateDto: CreateTemplateDto): Promise<SlotTemplate> {
        return await this.slotTemplatesService.create(createSlotTemplateDto);
    }

    @Patch(":id")
    @Requires(["Appointments:UPDATE"])
    async updateSlotTemplate(@Param('id') id: string, @Body() updateSlotTemplateDto: UpdateTemplateDto): Promise<SlotTemplateEntity> {
        return await this.slotTemplatesService.update(id, updateSlotTemplateDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @Requires(["Appointments:DELETE"])
    async deleteSlotTemplate(@Param('id') id: string) {
        await this.slotTemplatesService.delete(id);
        return { message: 'Slot template deleted successfully' };
    }

    @Post(":id/materialize")
    @Requires(["Appointments:WRITE"])
    async materializeSlotTemplate(@Param('id') id: string, @Body() materializeTemplateDto: MaterializeTemplateDto) {
        const fromDate = new Date(materializeTemplateDto.fromDate);
        await this.slotTemplatesService.materialize(id, fromDate, materializeTemplateDto.weeks);
        return { message: 'Slot template materialized successfully' };
    }
}
