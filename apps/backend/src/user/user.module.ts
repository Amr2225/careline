import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';
import { ValidateRoles } from './pipes/validate-roles.pipe';

@Module({
  imports: [DbModule, RbacModule],
  controllers: [UserController],
  providers: [UserService, ValidateRoles],
  exports: [UserService]
})
export class UserModule { }
