import { DbService } from '@/db/db.service';
import { Prisma, User } from '@careline/shared/prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserWithoutPassword } from '@careline/shared/types/user.type';

@Injectable()
export class UserService {
    constructor(private readonly db: DbService) { }

    async getUsers(): Promise<User[]> {
        return await this.db.user.findMany();
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.db.user.findUnique({ where: { email } });
        if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

        return user;
    }

    async findById(id: string): Promise<UserWithoutPassword> {
        console.log("Finding user by id", id);
        const user = await this.db.user.findUnique({ where: { id }, omit: { passwordHash: true, isBootstrapAdmin: true } });
        if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

        return user;
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
