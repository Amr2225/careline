import { InternalServerErrorException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import type { DoubleCsrfConfigOptions } from "csrf-csrf";
import type { Request } from "express";
import type { Duration, unitOfTime } from "moment";
import moment from "moment";

export const csrfConfig = (configService: ConfigService): DoubleCsrfConfigOptions => ({
    cookieName: 'csrfToken',
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
    size: 32, // The size of the random value used to construct the message used for hmac generation
    cookieOptions: {
        httpOnly: false, // Frontend JS must read it to add it to the request header as X-CSRF-Token
        // secure: configService.getOrThrow<string>('NODE_ENV') === 'production',
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: (() => {
            const expiresIn = configService.getOrThrow<string>('REFRESH_TOKEN_EXPIRES_IN');
            if (!expiresIn) {
                throw new InternalServerErrorException(`REFRESH_TOKEN_EXPIRES_IN is not set`);
            }

            const [amount, unit] = expiresIn.split(" ") as [Duration, unitOfTime.DurationConstructor];
            if (!amount || !unit) {
                throw new InternalServerErrorException('JWT_EXPIRES_IN is not valid. It should be like "number unit"');
            }

            return moment.duration(Number(amount), unit).asMilliseconds();
        })(),
    },
    getSecret: () => configService.getOrThrow<string>('CSRF_SECRET'),
    getSessionIdentifier: (req: Request) => req.cookies.refreshToken ?? "anonymous", // Should be a stable value that identifies the user, not the token itself refreshToken/SessionId/UserId
    getCsrfTokenFromRequest: (req: Request) => req.headers['x-csrf-token'] as string,
    errorConfig: {
        statusCode: 401,
        message: 'INVALID_CSRF_TOKEN',
    }
})