import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { DbModule } from '@/db/db.module';

@Module({
  imports: [DbModule],
  providers: [RbacService],
  controllers: [RbacController],
  exports: [RbacService]
})

export class RbacModule { }
