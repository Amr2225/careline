import type { ConfigService } from "@nestjs/config";
import type { DoubleCsrfConfigOptions } from "csrf-csrf";
import type { Request } from "express";

export const csrfConfig = (configService: ConfigService): DoubleCsrfConfigOptions => ({
    cookieName: 'csrfToken',
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
    size: 32, // The size of the random value used to construct the message used for hmac generation
    cookieOptions: {
        httpOnly: false, // Frontend JS must read it to add it to the request header as X-CSRF-Token
        // secure: config.getOrThrow<string>('NODE_ENV') === 'production',
        secure: true,
        sameSite: 'strict',
        path: '/api/v1/',
    },
    getSecret: () => configService.getOrThrow<string>('CSRF_SECRET'),
    getSessionIdentifier: (req: Request) => req.cookies.refreshToken, // Should be a table value that identifies the user, not the token itself refreshToken/SessionId/UserId
    getCsrfTokenFromRequest: (req: Request) => req.headers['x-csrf-token'] as string,
})