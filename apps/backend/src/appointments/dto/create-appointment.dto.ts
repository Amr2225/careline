import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

const CUID_REGEX = /^c[a-z0-9]{24}$/;

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @Matches(CUID_REGEX, { message: "Invalid slot ID" })
    slotId: string;

    @IsOptional()
    @IsString()
    @Matches(CUID_REGEX, { message: "Invalid Patient ID" })
    patientId?: string;
}