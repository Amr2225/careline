import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserModule } from '@/user/user.module';
import { DbModule } from '@/db/db.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RbacModule } from '@/rbac/rbac.module';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    UserModule,
    RbacModule,
    DbModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtRefreshStrategy,
    JwtAuthGuard,
    JwtStrategy
  ]
})
export class AuthModule { }
