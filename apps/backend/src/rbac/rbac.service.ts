import { DbService } from '@/db/db.service';
import { Action } from '@careline/shared/prisma/enums';
import { Role } from '@careline/shared/types/rbac.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RbacService {
    constructor(private readonly dbService: DbService) { }
    private readonly PROTECTED_ROLES = ['Manager', 'Patient'];
    private readonly MANAGER_EQUIVALENT_PERMISSIONS = [
        { module: 'Users', action: Action.READ },
        { module: 'Users', action: Action.WRITE },
        { module: 'Users', action: Action.UPDATE },
        { module: 'Users', action: Action.DELETE },
        { module: 'Roles', action: Action.READ },
        { module: 'Roles', action: Action.WRITE },
        { module: 'Roles', action: Action.UPDATE },
        { module: 'Roles', action: Action.DELETE },
    ];

    async getPremissionsForUser(userId: string): Promise<Set<string>> {
        const permissionSet = new Set<string>();

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
                permissionSet.add(`${permission.module.name}:${permission.action.toLocaleLowerCase()}`)
            })
        })

        return permissionSet;
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

    // Might be deleted if not used
    async hasRole(userId: string, roleName: string): Promise<boolean> {
        const role = await this.dbService.userRole.findFirst({
            where: {
                userId,
                role: {
                    name: roleName
                }
            }
        })

        return !!role
    }

    private async isRoleProtected(roleId: string): Promise<boolean> {
        const role = await this.dbService.role.findUnique({ where: { id: roleId } });
        return role?.isSystem === true && this.PROTECTED_ROLES.includes(role?.name);
    }

    async canEditRolePermission(roleId: string): Promise<boolean> {
        return !(await this.isRoleProtected(roleId));
    }

    async canDeleteRole(roleId: string): Promise<boolean> {
        // false if role is isSystem and name is 'Manager', OR if any users still hold the role 
        if (await this.isRoleProtected(roleId)) return false;

        const userCount = await this.dbService.userRole.count({ where: { roleId: roleId } });
        return userCount === 0;
    }

    async canRemoveRoleFromUser(userId: string, roleId: string): Promise<boolean> {
        // false if removing this role would leave the user with no Manager-equivalent permissions AND they're the last user with full Users + Roles access
        const currentPermissions = await this.getPremissionsForUser(userId);
        if (!this.hasManagerEquivalentPermissions(currentPermissions)) return true;

        const remainingPermissions = await this.getPremissionsForUserExcludingRole(userId, roleId);
        if (this.hasManagerEquivalentPermissions(remainingPermissions)) return true;

        const otherManagerEquivalentUser = await this.dbService.user.findFirst({
            where: {
                id: { not: userId },
                isActive: true,
                AND: this.MANAGER_EQUIVALENT_PERMISSIONS.map(({ module, action }) => ({
                    userRoles: {
                        some: {
                            role: {
                                permissions: {
                                    some: {
                                        action,
                                        module: { name: module },
                                    },
                                },
                            },
                        },
                    },
                })),
            },
            select: { id: true },
        });
        return !!otherManagerEquivalentUser;
    }

    private hasManagerEquivalentPermissions(permissions: Set<string>): boolean {
        return this.MANAGER_EQUIVALENT_PERMISSIONS.every(({ module, action }) =>
            permissions.has(`${module}:${action.toLocaleLowerCase()}`)
        );
    }

    async canDeactivateUser(userId: string): Promise<boolean> {
        // false "if [deactivation] would leave zero active users with full Users + Roles permissions.

        const usersWithMangerRole = await this.dbService.user.count({
            where: {
                id: { not: userId },
                isActive: true,
                AND: this.MANAGER_EQUIVALENT_PERMISSIONS.map(({ module, action }) => ({
                    userRoles: {
                        some: {
                            role: {
                                permissions: {
                                    some: {
                                        module: { name: module },
                                        action: action
                                    }
                                }
                            }
                        }
                    }

                }))

            }
        })

        return usersWithMangerRole > 0;
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

    private async getPremissionsForUserExcludingRole(userId: string, roleId: string): Promise<Set<string>> {
        const permissionSet = new Set<string>();
        const userRoles = await this.dbService.userRole.findMany({
            where: {
                userId,
                roleId: { not: roleId },
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
        });
        userRoles.forEach(userRole => {
            userRole.role.permissions.forEach((permission) => {
                permissionSet.add(`${permission.module.name}:${permission.action.toLocaleLowerCase()}`)
            })
        });
        return permissionSet;
    }
}
