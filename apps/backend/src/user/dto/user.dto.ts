import { UserCreateInput } from "@careline/shared/prisma/models";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto implements UserCreateInput {
    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    @IsString()
    name?: string | null | undefined;
}