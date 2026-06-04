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
import { RolesModule } from './roles/roles.module';
import { PatientModule } from './patient/patient.module';
import { SettingsService } from './settings/settings.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsModule } from './settings/settings.module';
import { SlotsModule } from './slots/slots.module';
import { SlotTemplatesModule } from './slot-templates/slot-templates.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ArrivalModule } from './arrival/arrival.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate
    }),
    ScheduleModule.forRoot(),
    DbModule,
    UserModule,
    AuthModule,
    RbacModule,
    RolesModule,
    PatientModule,
    SettingsModule,
    SlotsModule,
    SlotTemplatesModule,
    AppointmentsModule,
    ArrivalModule,
  ],
  controllers: [AppController, SettingsController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
    SettingsService
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) { }
  configure(consumer: MiddlewareConsumer) {
    const { doubleCsrfProtection } = doubleCsrf(csrfConfig(this.configService));
    consumer
      .apply(doubleCsrfProtection)
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .exclude({ path: 'auth/refresh', method: RequestMethod.POST })
      .forRoutes('*wildcard');
  }
}
