import { Requires } from '@/rbac/decorator/requires.decorator';
import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-roles.dto';
import { UpdateRoleDto } from './dto/update-roles.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Get()
    @Requires(["Roles:READ"])
    async getRoles() { // TODO: Implement query params
        return await this.rolesService.list();
    }

    @Post()
    @Requires(["Roles:WRITE"])
    async createRole(@Body() createRoleDto: CreateRoleDto) {
        return await this.rolesService.create(createRoleDto);
    }

    @Get(':id')
    @Requires(["Roles:READ"])
    async getRoleById(@Param('id') id: string) {
        return await this.rolesService.list(id);
    }

    @Patch(':id')
    @Requires(["Roles:UPDATE"])
    async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return await this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @Requires(["Roles:DELETE"])
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteRole(@Param('id') id: string) {
        await this.rolesService.delete(id);
        return { message: 'Role deleted successfully' };
    }
}
