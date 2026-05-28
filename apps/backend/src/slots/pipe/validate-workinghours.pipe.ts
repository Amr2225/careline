import { SettingsService } from "@/settings/settings.service";
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateSlotDto } from "../dto/create-slot.dto";
import { ConfigService } from "@nestjs/config";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

@Injectable()
export class ValidateWorkingHours implements PipeTransform {
    constructor(private readonly settingsService: SettingsService, private readonly configService: ConfigService) { }

    async transform(value: CreateSlotDto) {
        const timezone = this.configService.getOrThrow<string>('TIMEZONE');
        const settings = await this.settingsService.getAll();
        const workingDays = JSON.parse(settings.clinicHours);

        const workingDay = workingDays[String(toZonedTime(value.startDateTime, timezone).getDay())];
        if (!workingDay) throw new BadRequestException('Working day not found');

        const formattedStartTime = formatInTimeZone(value.startDateTime, timezone, "HH:mm");

        if ((formattedStartTime < workingDay.open) || (formattedStartTime > workingDay.close)) throw new BadRequestException('Start time is outside the working hours');

        return value;
    }
}
