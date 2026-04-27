import { DbService } from '@/db/db.service';
import { Prisma, User } from '@/generated/prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private readonly db: DbService) { }

    async getUsers(): Promise<User[]> {
        return await this.db.user.findMany();
    }

    async createUser(user: CreateUserDto): Promise<User | undefined> {
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
