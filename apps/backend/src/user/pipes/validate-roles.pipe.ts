import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { DbService } from "@/db/db.service";


@Injectable()
export class ValidateRoles implements PipeTransform {
    constructor(private readonly dbService: DbService) { }

    async transform(value: CreateUserDto, _metadata: ArgumentMetadata) {
        const requestedRoles = [...new Set(value.roles ?? [])];

        if (!requestedRoles.length) return value;


        const foundRoles = await this.dbService.role.findMany({
            where: {
                name: {
                    in: requestedRoles
                }
            },
            select: {
                id: true,
                name: true,
            }
        })

        const foundRoleNames = new Set(foundRoles.map((role) => role.name));
        const missingRoles = requestedRoles.filter((role) => !foundRoleNames.has(role));

        if (missingRoles.length > 0) {
            throw new BadRequestException(`Roles do not exist: ${missingRoles.join(", ")}`);

        }

        return {
            ...value,
            roles: foundRoles.map(({ id, name }) => ({ id, name }))
        };
    }
}