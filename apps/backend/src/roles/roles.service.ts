import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { RbacService } from '@/rbac/rbac.service';
import { Prisma } from '@careline/shared/prisma/client';
import { CreateRoleDto } from './dto/create-roles.dto';
import { Action, MODULE_NAMES } from '@careline/shared/types/rbac.type';
import { UpdateRoleDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
    constructor(private readonly db: DbService, private readonly rbacService: RbacService) { }

    async list(roleId?: string) {
        const select = {
            id: true,
            name: true,
            description: true,
            isSystem: true,
            permissions: {
                select: { action: true, module: { select: { name: true } } }
            },
            _count: {
                select: {
                    users: true,
                }
            }
        }

        return roleId ? await this.db.role.findUnique({
            where: { id: roleId },
            select: select
        }) : await this.db.role.findMany({ select, orderBy: { createdAt: "asc" } });
    }

    async create(role: CreateRoleDto) {
        try {
            return await this.db.role.create({
                select: {
                    name: true,
                    description: true,
                    _count: {
                        select: {
                            permissions: true
                        }
                    }
                },
                data: {
                    name: role.name,
                    description: role.description,
                    permissions: {
                        create: role.permissions.map((permission) => {
                            const [module, action] = permission.split(":");

                            if (!MODULE_NAMES.includes(module as (typeof MODULE_NAMES)[number])) {
                                throw new BadRequestException(`Invalid module: ${module}`);
                            }

                            if (!this.isValidAction(action)) throw new BadRequestException("Invalid action");
                            this.assertActionAppliesToModule(module, action as Action);

                            return {
                                module: { connect: { name: module } },
                                action: action as Action,
                            }
                        }),
                    },
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new BadRequestException("Role with the same name already exists");
            }

            throw error;
        }
    }

    private isValidAction(value: string): boolean {
        return value !== undefined && Object.values(Action).includes(value as Action);
    }

    private assertActionAppliesToModule(module: string, action: Action) {
        if (action === Action.UPDATE_MEDICAL && module !== "Patients") {
            throw new BadRequestException(`Action ${action} does not apply to module ${module}`);
        }
    }

    async update(roleId: string, updateRoleDto: UpdateRoleDto) {
        if (!await this.rbacService.canEditRolePermission(roleId)) throw new ForbiddenException("This role is not editable");

        const permissions = updateRoleDto.permissions ? [...new Set(updateRoleDto.permissions)] : undefined;

        return await this.db.role.update({
            where: { id: roleId },
            data: {
                name: updateRoleDto.name ?? Prisma.skip,
                description: updateRoleDto.description ?? Prisma.skip,
                permissions: permissions ? {
                    deleteMany: {},
                    create: permissions.map((permission) => {
                        const [module, action] = permission.split(":");
                        if (!this.isValidAction(action)) throw new BadRequestException("Invalid action");
                        this.assertActionAppliesToModule(module, action as Action);

                        return {
                            module: { connect: { name: module } },
                            action: action as Action,
                        }
                    }),
                } : Prisma.skip,
            }, select: {
                id: true,
                _count: {
                    select: {
                        users: true
                    }
                }
            }
        })

    }

    async delete(roleId: string) {
        if (!await this.rbacService.canDeleteRole(roleId)) throw new ForbiddenException("This role is not deletable or has users assigned to it");

        try {
            await this.db.role.delete({ where: { id: roleId } });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("Role not found");
            }

            throw error;
        }
    }
}
