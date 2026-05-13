import { IsString } from "class-validator";
import { CreatePatientDto } from "./create-patient.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class UpdatePatientDto extends PartialType(OmitType(CreatePatientDto, ["userId"])) { }

export class UpdatePatientMedicalDto {
    @IsString()
    medicalNotes: string;
}