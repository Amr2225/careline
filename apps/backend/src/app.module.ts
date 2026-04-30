import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from '@/db/db.module';
import { validate } from '@/config/env.validate';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { csrfConfig } from './auth/config/csrf.config';
import { doubleCsrf } from 'csrf-csrf';

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
  ],
  controllers: [AppController],
  // providers: [UserService],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) { }
  configure(consumer: MiddlewareConsumer) {
    const { doubleCsrfProtection } = doubleCsrf(csrfConfig(this.configService));
    consumer
      .apply(doubleCsrfProtection)
      .exclude("/api/v1/auth/login")
      .forRoutes('*wildcard');
  }
}
