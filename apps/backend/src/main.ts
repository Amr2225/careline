import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NextFunction, Request } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  // const { doubleCsrfProtection } = doubleCsrf({
  //   cookieName: 'csrfToken',
  //   getSecret: () => config.getOrThrow<string>('CSRF_SECRET'),
  //   cookieOptions: {
  //     httpOnly: false, // Frontend JS must read it to add it to the request header as X-CSRF-Token
  //     // secure: config.getOrThrow<string>('NODE_ENV') === 'production',
  //     secure: true,
  //     sameSite: 'strict',
  //     path: '/api/v1/',
  //   },
  //   getSessionIdentifier: (req) => req.cookies.refreshToken, // Should be a table value that identifies the user, not the token itself refreshToken/SessionId/UserId
  //   getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'],
  // })

  const dashboardOrigin = config.getOrThrow<string>('WEB_ORIGIN');
  const PwaOrigin = config.getOrThrow<string>('PWA_ORIGIN');
  // config.getOrThrow<string>('NODE_ENV') === "production"

  app.enableCors({
    origin: [dashboardOrigin, PwaOrigin],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log("CSRF Token", req.cookies.csrfToken);
    next();
  });

  app.setGlobalPrefix('api/v1/')
  await app.listen(config.getOrThrow<number>('PORT'));
}

void bootstrap();