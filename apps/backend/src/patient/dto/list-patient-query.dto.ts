import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { BloodType, Gender } from "@careline/shared/types/patient.type";
import { ListPatientQuery } from "@careline/shared/types/patient.type";

export class ListPatientQueryDto implements ListPatientQuery {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail(undefined, { message: "Invalid email address" })
    email?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true")
    isActive?: boolean;

    @IsString()
    @IsOptional()
    medicalNotes?: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @IsEnum(BloodType)
    @IsOptional()
    bloodType?: BloodType;
}

export class UserWithPatientRoleSearch {
    @IsOptional()
    @IsString()
    search?: string;
}