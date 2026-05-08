import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserServiceInput, UserService } from "@/user/user.service"
import { User } from '@careline/shared/prisma/client';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';
import { User as CurrentUser } from '@/auth/decorators/user.decorator';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { Action } from '@careline/shared/types/rbac.type';
import { ValidateRoles } from './pipes/validate-roles.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { QueryUserDto } from './dto/query-user.dto';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Requires("Users", Action.READ)
    async getUsers(@Query() queryUserDto: QueryUserDto): Promise<UserWithoutPassword[]> {
        return await this.userService.getUsers(queryUserDto);
    }

    @Post()
    @Requires("Users", Action.WRITE)
    async createUser(@CurrentUser() currentUser: UserWithoutPassword, @Body(ValidateRoles) user: CreateUserDto): Promise<User> {
        return await this.userService.createUser(currentUser.id, user as CreateUserServiceInput);
    }

    @Get(':id')
    @Requires("Users", Action.READ)
    async getUserById(@Param('id') id: string): Promise<UserWithoutPassword> {
        return await this.userService.findById(id);
    }

    @Patch(':id')
    @Requires("Users", Action.UPDATE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        await this.userService.updateUser(id, updateUserDto);
        return { message: 'User updated successfully' };
    }

    @Patch(':id/role')
    @Requires("Users", Action.UPDATE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateUserRole(@Param('id') id: string, @Body() updateUserRolesDto: UpdateUserRolesDto) {
        await this.userService.updateUserRole(id, updateUserRolesDto.currentRoleId, updateUserRolesDto.newRoleId);
        return { message: 'User role updated successfully' };
    }

    @Delete(':id')
    @Requires("Users", Action.DELETE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: string) {
        await this.userService.softDelete(id);

        return { message: 'User deleted successfully' };
    }
}
