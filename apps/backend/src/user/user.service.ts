import { DbService } from '@/db/db.service';
import { Prisma, User } from '@careline/shared/prisma/client';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity, UserWithoutPassword } from '@careline/shared/types/user.type';
import { RbacService } from '@/rbac/rbac.service';
import { hashPassword } from '@/common/password.utils';
import { UpdateUserDto } from './dto/update-user.dto';

type Role = {
    id: string;
    name: string;
};

export type CreateUserServiceInput = Omit<CreateUserDto, 'roles'> & {
    roles?: Role[];
};

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
                none: { role: { name: "Patient" } }
            }
        }

        if (queryUserDto.name || queryUserDto.email) {
            where.OR = [
                { name: { contains: queryUserDto.name, mode: "insensitive" } },
                { email: { contains: queryUserDto.email, mode: "insensitive" } }
            ]
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
                    include: {
                        role: true,
                    }
                }
            }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.db.user.findUnique({ where: { email } });
        if (user?.isActive) return user;

        throw new HttpException("User is deactivated", HttpStatus.UNAUTHORIZED);
    }

    async findById(id: string): Promise<UserEntity> {
        console.log("Finding user by id", id);
        const user = await this.db.user.findUnique({ where: { id }, omit: { passwordHash: true, isBootstrapAdmin: true } });
        if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

        const roles = await this.rbacService.getRoles(user.id);
        const permissions = await this.rbacService.getPremissionsForUser(user.id);

        return { ...user, roles, permissions: Array.from(permissions) };
    }

    async createUser(requestUserId: string, user: CreateUserServiceInput): Promise<User> {
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

    async updateUser(id: string, user: UpdateUserDto): Promise<User> {
        if (!user.email) {
            try {
                const updatedUser = await this.db.user.update({
                    where: { id },
                    data: {
                        ...user,
                        passwordHash: await hashPassword(user.password!),
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
                this.db.user.update({ where: { id }, data: { ...user, passwordHash: await hashPassword(user.password!) } }),
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
        if (!await this.rbacService.canRemoveRoleFromUser(id, currentRoleId)) throw new BadRequestException("You cannot remove this role from the user");

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
        if (!this.rbacService.canDeactivateUser(id)) throw new BadRequestException("You cannot deactivate this user");

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
}
