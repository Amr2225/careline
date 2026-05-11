import { IsArray, IsString, Matches } from "class-validator";

export class CreateRoleDto {
    @IsString({ message: "Role name is required" })
    name: string;

    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true, message: "Permissions must be an array of strings" })
    @Matches(/^[A-Z]+:[A-Z]+$/i, { each: true, message: "Invalid permission format it should be Module:Action" })
    permissions: string[]; // User:read 
}