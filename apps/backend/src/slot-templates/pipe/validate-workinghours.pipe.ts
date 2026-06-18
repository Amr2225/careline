import { SettingsService } from "@/settings/settings.service";
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateTemplateDto } from "../dto/create-template.dto";

@Injectable()
export class ValidateWorkingHours implements PipeTransform {
    constructor(private readonly settingsService: SettingsService) { }

    async transform(value: CreateTemplateDto) {
        const settings = await this.settingsService.getAll();
        const workingDays = JSON.parse(settings.clinicHours);
        const workingDay = workingDays[String(value.weekday)];

        if (!workingDay) throw new BadRequestException('Working day not found');

        if ((value.startTime < workingDay.open) || (value.endTime > workingDay.close)) throw new BadRequestException('Start time or end time is outside the working hours');

        return value;
    }
}
