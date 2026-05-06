import { DbService } from '@/db/db.service';
import { Action } from '@careline/shared/prisma/enums';
import { Role } from '@careline/shared/types/rbac.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RbacService {
    constructor(private readonly dbService: DbService) { }
    private rolesSet = new Set<string>();

    async getPremissionsForUser(userId: string): Promise<Set<string>> {
        const userRoles = await this.dbService.userRole.findMany({
            where: {
                userId: userId
            },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                module: true
                            }
                        }
                    }
                }
            }
        })

        userRoles.forEach(userRole => {
            const permissions = userRole.role.permissions;

            permissions.forEach((permission) => {
                this.rolesSet.add(`${permission.module.name}:${permission.action.toLocaleLowerCase()}`)
            })
        })

        return this.rolesSet;
    }

    async getRoles(userId: string): Promise<Role[]> {
        const userRoles = await this.dbService.userRole.findMany({
            where: {
                userId: userId
            },
            include: {
                role: true
            }
        })

        return userRoles.map(userRole => ({ id: userRole.role.id, name: userRole.role.name }));
    }

    async canDeleteRole(roleId: string): Promise<boolean> {
        // false if role is isSystem and name is 'Manager', OR if any users still hold the role 
        console.log(roleId);
        return Promise.resolve(true)
    }

    async canRemoveRoleFromUser(userId: string, roleId: string): Promise<boolean> {
        // false if removing this role would leave the user with no Manager-equivalent permissions AND they're the last user with full Users + Roles access
        console.log(userId, roleId);
        return Promise.resolve(true)
    }

    async canDeactivateUser(userId: string): Promise<boolean> {
        // false if it would leave zero active users with full Users + Roles permissions 
        console.log(userId);
        return Promise.resolve(true)
    }

    // TODO: Assess the need of this method
    async has(permissions: Set<string>, module: string, action: Action): Promise<boolean> {
        return permissions.has(`${module}:${action.toLocaleLowerCase()}`);
    }

    async hasPermission(userId: string, module: string, action: Action) {
        const foundPermission = await this.dbService.userRole.findFirst({
            where: {
                userId,
                role: {
                    permissions: {
                        some: {
                            action,
                            module: {
                                name: module,
                            }
                        }
                    }
                }
            }
        })

        return !!foundPermission;
    }
}
