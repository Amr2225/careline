import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsISO8601, IsOptional, IsString, Matches } from "class-validator";

export class CreateSlotDto {
    @IsISO8601({ strict: true })
    startDateTime: Date;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt({ message: "Invalid capacity" })
    capacity?: number;
}

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/
export class CreateBulkSlotsDto {
    @IsISO8601({ strict: true })
    startDate: string;

    @IsISO8601({ strict: true })
    endDate: string;

    @IsString({ message: "Invalid start time" })
    @Matches(timeRegex, { message: "Invalid start time fromat, expected HH:mm" })
    startTime: string

    @IsString({ message: "Invalid start time" })
    @Matches(timeRegex, { message: "Invalid start time fromat, expected HH:mm" })
    endTime: string

    @IsArray({ message: "Invalid days of week" })
    @IsInt({ each: true, message: "Invalid day of week" })
    @IsIn([0, 1, 2, 3, 4, 5, 6], { each: true, message: "Day of week must be between 0 and 6" })
    daysOfWeek: number[];

    @IsOptional()
    @IsString({ message: "Invalid start time" })
    @Matches(timeRegex, { message: "Invalid lunch start time fromat, expected HH:mm" })
    lunchStartTime?: string;

    @IsOptional()
    @IsString({ message: "Invalid start time" })
    @Matches(timeRegex, { message: "Invalid lunch end time fromat, expected HH:mm" })
    lunchEndTime?: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt({ message: "Invalid capacity" })
    capacity?: number;
}