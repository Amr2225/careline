import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestions } from './create-admin.questions';
import { UserModule } from '@/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config/env.validate';
import { AssignManagerRoleCommand } from './assign-manager-role.command';
import { DbModule } from '@/db/db.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
            validate
        }),
        UserModule,
        DbModule
    ],
    providers: [CreateAdminCommand, CreateAdminQuestions, AssignManagerRoleCommand],
})

export class CliModule { }
