import { Transform } from "class-transformer";
import { IsInt, IsISO8601, Max, Min } from "class-validator";

export class MaterializeTemplateDto {
    @IsISO8601({ strict: true })
    fromDate: string;

    @Transform(({ value }) => Number(value))
    @IsInt({ message: "Weeks is required" })
    @Min(1, { message: "Weeks must be greater than 0" })
    @Max(26, { message: "Weeks must be less than 26" })
    weeks: number;
}