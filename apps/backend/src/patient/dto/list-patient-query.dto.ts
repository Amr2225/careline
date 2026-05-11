import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { BloodType, Gender } from "@careline/shared/prisma/client";

export class ListPatientQueryDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail(undefined, { message: "Invalid email address" })
    email?: string;

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