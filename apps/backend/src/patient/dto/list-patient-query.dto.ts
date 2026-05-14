import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";
import { BloodType, Gender } from "@careline/shared/types/patient.type";
import { ListPatientQuery } from "@careline/shared/types/patient.type";

export class ListPatientQueryDto implements ListPatientQuery {
    @IsOptional()
    @Transform(({ value }) => {
        const limit = Number(value)
        return !limit || limit < 1 ? 10 : limit
    })
    @IsInt()
    @Min(1)
    limit: number = 10;

    @IsOptional()
    @Transform(({ value }) => {
        const page = Number(value)
        return !page || page < 1 ? 1 : page
    })
    @IsInt()
    @Min(1)
    page: number = 1;

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