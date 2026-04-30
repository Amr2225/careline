import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { AuthService } from "../auth.service";

// This is used to validate the JWT token from the request cookies
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(configService: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.refreshToken ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        })
    }

    async validate(request: Request) {
        console.log("Validating Refresh Payload: ", request.cookies);
        try {
            const user = await this.authService.validateRefreshToken(request.cookies.refreshToken);
            return user;
        } catch (e) {
            throw e;
        }
    }
}