import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@/db/db.module';
import { validate } from '@/config/env.validate';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env",
    validate
  }),
    DbModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule { }
