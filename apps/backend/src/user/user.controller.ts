import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from "@/user/user.service"
import { User } from '@careline/shared/prisma/client';
import { CreateUserDto } from '@/user/dto/user.dto';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User as CurrentUser } from '@/auth/decorators/user.decorator';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { Action } from '@careline/shared/types/rbac.type';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    async me(@CurrentUser() user: UserWithoutPassword): Promise<UserWithoutPassword> {
        return await this.userService.findById(user.id);
    }

    @Get("test-rbac")
    @Requires("Users", Action.READ)
    async testRBAC(): Promise<string> {
        return await this.userService.testRBAC();
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.userService.createUser(user);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserWithoutPassword> {
        return await this.userService.findById(id);
    }

}
