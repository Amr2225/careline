import { UserCreateInput } from "@/generated/prisma/models";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto implements UserCreateInput {
    @IsEmail()
    email: string;

    @IsString()
    name?: string | null | undefined;
}