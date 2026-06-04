import { IsDateString, IsISO8601, IsOptional } from 'class-validator';

export class QueryAvailableSlotsDto {
    @IsOptional()
    @IsDateString(
        {},
        { message: 'date must be a valid ISO date string (e.g. 2026-05-28)' },
    )
    date?: string;
}

export class QuerySlotsDto {
    @IsISO8601({ strict: true })
    from: string;

    @IsISO8601({ strict: true })
    to: string;
}