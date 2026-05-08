import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class QueryUserDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true, message: "Roles must be an array of strings" })
    roles: string[];

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}