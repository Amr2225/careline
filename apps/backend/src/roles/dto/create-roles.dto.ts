import { IsArray, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString({ message: "Role name is required" })
    name: string;

    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true, message: "Permissions must be an array of strings" })
    permissions: string[]; // User:read 
}