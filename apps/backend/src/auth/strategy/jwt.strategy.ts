import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UserService } from "@/user/user.service";
import { Audience, PATIENT_AUDIENCE, PATIENT_COOKIES, STAFF_AUDIENCE, STAFF_COOKIES } from "../auth.constants";

type AccessPayload = { sub: string; audience?: Audience };

// Resolves the user for a validated access token, but only if the token's audience
// claim matches the cookie it was presented in. This blocks audience confusion:
// a patient access token replayed in the staff cookie (or vice versa) is rejected.
async function resolveAccessUser(userService: UserService, payload: AccessPayload, expected: Audience) {
    if (payload.audience !== expected) throw new UnauthorizedException("Token audience mismatch");
    return await userService.findById(payload.sub);
}

@Injectable()
export class JwtStaffStrategy extends PassportStrategy(Strategy, "jwt-staff") {
    constructor(configService: ConfigService, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.[STAFF_COOKIES.access] ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        })
    }

    async validate(payload: AccessPayload) {
        return await resolveAccessUser(this.userService, payload, STAFF_AUDIENCE);
    }
}

@Injectable()
export class JwtPatientStrategy extends PassportStrategy(Strategy, "jwt-patient") {
    constructor(configService: ConfigService, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.[PATIENT_COOKIES.access] ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        })
    }

    async validate(payload: AccessPayload) {
        return await resolveAccessUser(this.userService, payload, PATIENT_AUDIENCE);
    }
}
