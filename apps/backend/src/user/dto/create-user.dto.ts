import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    @IsString()
    name: string

    @IsString({ message: "Password must be a string" })
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @Matches(/^(?=.*[0-9])(?=.*[A-Z]).+$/, { message: "Password must contain at least one number, one uppercase letter, and one special character" })
    password: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean = true;

    @IsOptional()
    @IsBoolean()
    isBootstrapAdmin: boolean = false;

    @IsArray()
    @IsOptional()
    @IsString({ each: true, message: "Roles must be an array of strings" })
    roles?: string[];
}