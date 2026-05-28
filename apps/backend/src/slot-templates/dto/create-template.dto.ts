import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsString, Matches, Max, Min } from "class-validator";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/

export class CreateTemplateDto {
    @IsString({ message: "Name is required" })
    name: string;

    @Transform(({ value }) => Number(value))
    @IsInt({ message: "Weekday is required" })
    @Min(0, { message: "Weekday must be greater than 0" })
    @Max(6, { message: "Weekday must be less than 6" })
    weekday: number;

    @IsString({ message: "Start time is required" })
    @Matches(timeRegex, { message: "Invalid start time fromat, expected HH:mm" })
    startTime: string;

    @IsString({ message: "End time is required" })
    @Matches(timeRegex, { message: "Invalid end time fromat, expected HH:mm" })
    endTime: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt({ message: "Capacity override is required" })
    @Min(1, { message: "Capacity override must be greater than 0" })
    capacityOverride?: number;

    @IsOptional()
    @IsBoolean({ message: "Is active is required" })
    @Transform(({ value }) => value === "true" || value === true)
    isActive?: boolean;
}