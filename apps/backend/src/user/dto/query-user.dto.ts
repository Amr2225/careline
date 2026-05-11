import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

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
    @Transform(({ value }) => value.split(","))
    roles: string[];

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true")
    isActive: boolean;
}