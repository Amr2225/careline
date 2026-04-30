import { UserCreateInput } from "@careline/shared/prisma/models";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto implements UserCreateInput {
    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    passwordHash: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean = true;

    @IsOptional()
    @IsBoolean()
    isBootstrapAdmin: boolean;
}