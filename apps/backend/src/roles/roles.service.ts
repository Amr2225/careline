import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { RbacService } from '@/rbac/rbac.service';
import { Prisma } from '@careline/shared/prisma/client';
import { CreateRoleDto } from './dto/create-roles.dto';
import { Action } from '@careline/shared/types/rbac.type';
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

    async create(createRoleDto: CreateRoleDto) {
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
                name: createRoleDto.name,
                description: createRoleDto.description,
                permissions: {
                    create: createRoleDto.permissions.map((permission) => {
                        const [module, action] = permission.split(":");
                        return {
                            module: { connect: { name: module } },
                            action: action as Action,
                        }
                    }),
                },
            }
        });
    }

    async update(roleId: string, updateRoleDto: UpdateRoleDto) {
        if (!await this.rbacService.canEditRolePermission(roleId)) throw new ForbiddenException("You are not allowed to edit this role");

        const permissions = updateRoleDto.permissions ? [...new Set(updateRoleDto.permissions)] : undefined;

        await this.db.role.update({
            where: { id: roleId },
            data: {
                name: updateRoleDto.name,
                description: updateRoleDto.description,
                permissions: permissions ? {
                    deleteMany: {},
                    create: permissions?.map((permission) => {
                        const [module, action] = permission.split(":");

                        return {
                            module: { connect: { name: module } },
                            action: action as Action,
                        }
                    }),
                } : undefined,
            }
        })

    }

    async delete(roleId: string) {
        if (!await this.rbacService.canDeleteRole(roleId)) throw new ForbiddenException("You are not allowed to delete this role");

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
