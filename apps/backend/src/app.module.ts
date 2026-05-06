import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from '@/db/db.module';
import { validate } from '@/config/env.validate';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { csrfConfig } from './auth/config/csrf.config';
import { doubleCsrf } from 'csrf-csrf';
import { RbacModule } from './rbac/rbac.module';
import { APP_GUARD } from '@nestjs/core';
import { RbacGuard } from './rbac/guards/rbac.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate
    }),
    DbModule,
    UserModule,
    AuthModule,
    RbacModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard }
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) { }
  configure(consumer: MiddlewareConsumer) {
    const { doubleCsrfProtection } = doubleCsrf(csrfConfig(this.configService));
    consumer
      .apply(doubleCsrfProtection)
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .forRoutes('*wildcard');
  }
}
