import { IsOptional, IsString } from "class-validator";
import { CreatePatientDto } from "./create-patient.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePatientDto extends PartialType(CreatePatientDto) { }

export class UpdatePatientMedicalDto {
    @IsString()
    @IsOptional()
    medicalNotes: string;
}