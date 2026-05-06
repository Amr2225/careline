import { DbService } from '@/db/db.service';
import { Prisma, User } from '@careline/shared/prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from '@careline/shared/types/user.type';
import { RbacService } from '@/rbac/rbac.service';

@Injectable()
export class UserService {
    constructor(private readonly db: DbService, private readonly rbacService: RbacService) { }

    // TODO: Remove this 
    async getUsers(): Promise<User[]> {
        return await this.db.user.findMany();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.db.user.findUnique({ where: { email } });
    }

    // TODO: Migrate this to the Auth controller
    async findById(id: string): Promise<UserEntity> {
        console.log("Finding user by id", id);
        const user = await this.db.user.findUnique({ where: { id }, omit: { passwordHash: true, isBootstrapAdmin: true } });
        if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

        const roles = await this.rbacService.getRoles(user.id);
        const permissions = await this.rbacService.getPremissionsForUser(user.id);

        return { ...user, roles, permissions: Array.from(permissions) };
    }

    async testRBAC(): Promise<string> {
        return "Hello World";
    }

    async createUser(user: CreateUserDto): Promise<User> {
        // TODO: validate this pattern checking on insert
        try {
            return await this.db.user.create({ data: user });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            )
                throw new HttpException("User with the same email already exists", HttpStatus.BAD_REQUEST);

            throw error
        }
    }
}
