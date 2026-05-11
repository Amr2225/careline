import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';

@Module({
    imports: [DbModule, RbacModule],
    controllers: [RolesController],
    providers: [RolesService]
})
export class RolesModule { }
