// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { Request, Response, NextFunction } from "express";
// import { doubleCsrf } from "csrf-csrf";
// import { ConfigService } from "@nestjs/config";

// @Injectable()
// export class CsrfMiddleware implements NestMiddleware {
//     constructor(private readonly configService: ConfigService) { }

//     use(req: Request, res: Response, next: NextFunction) {
//         const { doubleCsrfProtection } = doubleCsrf({
//             cookieName: 'csrfToken',
//             getSecret: () => this.configService.getOrThrow<string>('CSRF_SECRET'),
//             cookieOptions: {
//                 httpOnly: false, // Frontend JS must read it to add it to the request header as X-CSRF-Token
//                 // secure: config.getOrThrow<string>('NODE_ENV') === 'production',
//                 secure: true,
//                 sameSite: 'strict',
//                 path: '/api/v1/',
//             },
//             getSessionIdentifier: () => req.cookies.refreshToken, // Should be a table value that identifies the user, not the token itself refreshToken/SessionId/UserId
//             getCsrfTokenFromRequest: () => req.headers['x-csrf-token'],
//         })
//     }
// }
