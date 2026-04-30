import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { AuthService } from "../auth.service";
import { doubleCsrf } from "csrf-csrf";
import { csrfConfig } from "../config/csrf.config";

// This is used to validate the JWT token from the request cookies
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.refreshToken ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
        })
    }

    async validate(request: Request, response: Response) {
        console.log("Validating Refresh Payload");
        try {
            const user = await this.authService.validateRefreshToken(request.cookies.refreshToken);
            const { generateCsrfToken } = doubleCsrf(csrfConfig(this.configService))
            generateCsrfToken(request, response)
            // request.csrfToken();
            return user;
        } catch (e) {
            throw e;
        }
        // return { userId: payload.sub, email: payload.email };
    }
}