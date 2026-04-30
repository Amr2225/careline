import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestions } from './create-admin.questions';
import { UserModule } from '@/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config/env.validate';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
            validate
        }),
        UserModule
    ],
    providers: [CreateAdminCommand, CreateAdminQuestions],
})

export class CliModule { }
