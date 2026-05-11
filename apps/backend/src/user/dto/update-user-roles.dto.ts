import { IsNotEmpty, IsString, Matches } from "class-validator";

const CUID_REGEX = /^c[a-z0-9]{24}$/;

export class UpdateUserRolesDto {
    @IsString()
    @IsNotEmpty()
    @Matches(CUID_REGEX, { message: "Invalid current role ID" })
    currentRoleId: string;

    @IsString()
    @IsNotEmpty()
    @Matches(CUID_REGEX, { message: "Invalid new role ID" })
    newRoleId: string;
}