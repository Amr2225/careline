import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { Audience, PATIENT_AUDIENCE, PATIENT_COOKIES, STAFF_AUDIENCE, STAFF_COOKIES } from "../auth.constants";

type RefreshPayload = { sub: string; audience?: Audience };

// Validates a refresh token only when its audience claim matches the cookie it was
// presented in, then resolves the user from the stored (non-revoked) token. This
// prevents promoting a patient refresh token into a staff session and vice versa.
async function resolveRefreshUser(authService: AuthService, token: string | undefined, payload: RefreshPayload, expected: Audience) {
    if (payload.audience !== expected) throw new UnauthorizedException("Token audience mismatch");
    return await authService.validateRefreshToken(token as string);
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-staff') {
    constructor(configService: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.[STAFF_COOKIES.refresh] ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        })
    }

    async validate(request: Request, payload: RefreshPayload) {
        return await resolveRefreshUser(this.authService, request.cookies?.[STAFF_COOKIES.refresh], payload, STAFF_AUDIENCE);
    }
}

@Injectable()
export class JwtPatientRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-patient') {
    constructor(configService: ConfigService, private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.[PATIENT_COOKIES.refresh] ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        })
    }

    async validate(request: Request, payload: RefreshPayload) {
        return await resolveRefreshUser(this.authService, request.cookies?.[PATIENT_COOKIES.refresh], payload, PATIENT_AUDIENCE);
    }
}
