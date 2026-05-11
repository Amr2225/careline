import { IntersectionType, OmitType } from "@nestjs/mapped-types"
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { BloodType, Gender } from "@careline/shared/types/patient.type";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

const CUID_REGEX = /^c[a-z0-9]{24}$/;
export class CreatePatientDto {
    // Is removed for the DTO where I need to create a user first
    @IsString()
    @IsNotEmpty()
    @Matches(CUID_REGEX, { message: "Invalid user ID" })
    userId: string;

    @IsDateString({}, { message: "Invalid date of birth" })
    @IsNotEmpty()
    dateOfBirth: Date;

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    emergencyContactName?: string;

    @IsString()
    @IsOptional()
    emergencyContactPhone?: string;

    @IsEnum(BloodType)
    @IsOptional()
    bloodType?: BloodType;

    @IsString()
    @IsOptional()
    allergies?: string;

    @IsString()
    @IsOptional()
    chronicConditions?: string;

    @IsString()
    @IsOptional()
    currentMedications?: string;
}


export class CreatePatientWithoutUserIdDto extends OmitType(CreatePatientDto, [
    "userId",
] as const) { }

export class CreatePatientWithUserDto extends IntersectionType(
    CreateUserDto,
    CreatePatientWithoutUserIdDto,
) { }