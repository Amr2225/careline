import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from "@/user/user.service"
import { User } from '@/generated/prisma/client';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User | undefined> {
        return await this.userService.createUser(user);
    }
}
