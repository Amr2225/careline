import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';

@Module({
  imports: [DbModule, RbacModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
