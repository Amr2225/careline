import { IsArray, Matches, MinLength } from "class-validator";
import { IsEmail, IsString } from "class-validator";
import { IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString({ message: "Password must be a string" })
    @IsOptional()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @Matches(/^(?=.*[0-9])(?=.*[A-Z]).+$/, { message: "Password must contain at least one number, one uppercase letter, and one special character" })
    password?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true, message: "Roles must be an array of strings" })
    roles?: string[];
}