import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UserService } from "@/user/user.service";

// This is used to validate the JWT token from the request cookies
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.accessToken ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        })
    }

    // Payload is the JWT payload
    async validate(payload: any) {
        console.log("Validating Payload");
        // As per the config in the signIn method in the authService the sub is the userId
        return await this.userService.findById(payload.sub);
    }
}