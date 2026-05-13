import { DbService } from '@/db/db.service';
import { Prisma, User } from '@careline/shared/prisma/client';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity, UserWithoutPassword } from '@careline/shared/types/user.type';
import { RbacService } from '@/rbac/rbac.service';
import { hashPassword } from '@/common/password.utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { SYSTEM_ROLES } from '@careline/shared/types/rbac.type';

type Role = {
    id: string;
    name: string;
};

export type CreateUserServiceInput = Omit<CreateUserDto, 'roles'> & {
    roles?: Role[];
};

export type UpdateUserServiceInput = Omit<UpdateUserDto, 'roles'> & {
    roles?: Role[];
}

type UsersFilter = {
    name?: string;
    email?: string;
    roles?: string[];
    isActive?: boolean;
}

@Injectable()
export class UserService {
    constructor(private readonly db: DbService, private readonly rbacService: RbacService) { }

    async getUsers(queryUserDto: UsersFilter = {}): Promise<UserWithoutPassword[]> {
        const where: Prisma.UserWhereInput = {
            userRoles: {
                none: { role: { name: SYSTEM_ROLES.PATIENT } }
            }
        }

        if (queryUserDto.name) {
            where.OR = [
                { name: { contains: queryUserDto.name, mode: "insensitive" } },
            ]
        }
        // ETIMEDOUT

        if (queryUserDto.email) {
            where.OR !== undefined
                ? (where.OR as Prisma.UserWhereInput[]).push({ email: { contains: queryUserDto.email, mode: "insensitive" } })
                : where.OR = [
                    { email: { contains: queryUserDto.email, mode: "insensitive" } }
                ];
        }

        if (queryUserDto?.roles?.length) {
            where.userRoles = {
                ...where.userRoles,
                some: {
                    role: {
                        name: { in: queryUserDto.roles }
                    }
                }
            }
        }

        if (queryUserDto?.isActive !== undefined) {
            where.isActive = queryUserDto.isActive;
        }


        return await this.db.user.findMany({
            where,
            omit: { passwordHash: true, isBootstrapAdmin: true },
            include: {
                userRoles: {
                    omit: {
                        roleId: true,
                        userId: true,
                    },
                    include: {
                        role: true
                    },
                }
            }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.db.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<UserEntity> {
        console.log("Finding user by id", id);
        const user = await this.db.user.findUnique({ where: { id }, omit: { passwordHash: true, isBootstrapAdmin: true } });
        if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

        const roles = await this.rbacService.getRoles(user.id);
        const permissions = await this.rbacService.getPremissionsForUser(user.id);

        return { ...user, roles, permissions: Array.from(permissions) };
    }

    async createAdminUser(user: CreateUserDto): Promise<User> {
        try {
            return await this.db.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    passwordHash: await hashPassword(user.password),
                    isBootstrapAdmin: true,
                    isActive: true,
                }
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            )
                throw new HttpException("User with the same email already exists", HttpStatus.BAD_REQUEST);

            throw error
        }
    }


    async createUser(requestUserId: string | null, user: CreateUserServiceInput): Promise<User> {
        try {
            const createdUser = await this.db.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    passwordHash: await hashPassword(user.password),
                }
            });

            if (user.roles) {
                await this.db.userRole.createMany({
                    data: user.roles.map((role: Role) => ({
                        userId: createdUser.id,
                        roleId: role.id,
                        assignedById: requestUserId,
                    }))
                })
            }


            return createdUser;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            )
                throw new HttpException("User with the same email already exists", HttpStatus.BAD_REQUEST);

            throw error
        }
    }

    async updateUser(id: string, user: UpdateUserServiceInput, requestUserId: string): Promise<User> {
        if (user.roles && user.roles.length > 0) {
            const currentUserRoles = await this.rbacService.getRoles(id);

            const newRolesIdSet = new Set(user.roles.map((role) => role.id));
            const currentRolesIdSet = new Set(currentUserRoles.map((role) => role.id));
            const rolesToRemove = currentRolesIdSet.difference(newRolesIdSet);

            // TODO: Assess this logic (Because this will falsely deny a valid change of a legitimate manger role to another manager role) because the updated set is not considered yet
            if (rolesToRemove.size > 0) {
                for (let roleId of rolesToRemove) {
                    if (!await this.rbacService.canRemoveRoleFromUser(id, roleId)) throw new BadRequestException("You cannot remove this role from this user");
                }
            }
        }

        if (!user.email) {
            try {
                const updatedUser = await this.db.user.update({
                    where: { id },
                    data: {
                        name: user.name ?? Prisma.skip,
                        passwordHash: user.password ? await hashPassword(user.password) : Prisma.skip,
                        userRoles: user.roles && user.roles.length > 0 ? {
                            deleteMany: {},
                            create: user.roles.map((role) => ({
                                roleId: role.id,
                                assignedById: requestUserId,
                            })),
                        } : Prisma.skip,
                    }
                })

                return updatedUser;

            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    throw new BadRequestException("User not found");
                }

                throw error;
            }
        }

        try {
            const [updatedUser] = await this.db.$transaction([
                this.db.user.update({
                    where: { id },
                    data: {
                        name: user.name,
                        email: user.email,
                        passwordHash: user.password ? await hashPassword(user.password) : Prisma.skip,
                        userRoles: user.roles && user.roles.length > 0 ? {
                            deleteMany: {},
                            create: user.roles.map((role) => ({
                                roleId: role.id,
                                assignedById: requestUserId,
                            })),
                        } : Prisma.skip,
                    }
                }),

                this.db.refreshToken.updateMany({ where: { userId: id, revokedAt: null }, data: { revokedAt: new Date() } })
            ])

            return updatedUser;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("User not found");
            }

            throw error;
        }
    }

    async updateUserRole(id: string, currentRoleId: string, newRoleId: string) {
        if (!await this.rbacService.canRemoveRoleFromUser(id, currentRoleId)) throw new BadRequestException("You cannot update this role from the user because he/she is the last user with full Users + Roles permissions");

        try {
            await this.db.$transaction([
                this.db.userRole.update({
                    where: {
                        userId_roleId: {
                            userId: id,
                            roleId: currentRoleId,
                        }
                    },
                    data: {
                        roleId: newRoleId,
                    }
                }),
                this.db.refreshToken.updateMany({ where: { userId: id, revokedAt: null }, data: { revokedAt: new Date() } })
            ])
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("User or role(s) are not found");
            }

            throw error;
        }
    }

    async softDelete(id: string) {
        if (!await this.rbacService.canDeactivateUser(id)) throw new BadRequestException("You cannot deactivate this user because he/she is the last user with full Users + Roles permissions");

        try {
            await this.db.$transaction([
                this.db.user.update({
                    where: { id },
                    data: { isActive: false }
                }),
                this.db.refreshToken.updateMany({ where: { userId: id, revokedAt: null }, data: { revokedAt: new Date() } })
            ])

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("User not found");
            }

            throw error;
        }

    }

    async reactivate(id: string) {
        try {
            await this.db.user.update({ where: { id }, data: { isActive: true } });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("User not found");
            }

            throw error;
        }
    }
}
