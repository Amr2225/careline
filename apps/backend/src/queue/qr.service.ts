import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { QrTokenResponse } from '@careline/shared/types/ticket.type';
import { WALK_IN_TOKEN_PURPOSE, WALK_IN_TOKEN_TTL_SECONDS } from './queue.constants';

@Injectable()
export class QrService {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) { }

    // The QR encodes a deep link into the PWA carrying a short-lived signed token,
    // so scanning a stale screenshot later fails the expiry check.
    async buildCheckInQr(): Promise<QrTokenResponse> {
        const token = await this.jwtService.signAsync(
            { purpose: WALK_IN_TOKEN_PURPOSE },
            { secret: this.secret(), expiresIn: WALK_IN_TOKEN_TTL_SECONDS },
        );
        const pwaOrigin = this.configService.getOrThrow<string>('PWA_ORIGIN');

        return {
            token,
            url: `${pwaOrigin}/walk-in?token=${token}`,
            expiresInSeconds: WALK_IN_TOKEN_TTL_SECONDS,
        };
    }

    async verifyCheckInToken(token: string): Promise<void> {
        let payload: { purpose?: string };
        try {
            payload = await this.jwtService.verifyAsync(token, { secret: this.secret() });
        } catch {
            throw new BadRequestException('This check-in code has expired. Ask the front desk for the current QR.');
        }

        if (payload.purpose !== WALK_IN_TOKEN_PURPOSE) {
            throw new BadRequestException('Invalid check-in code.');
        }
    }

    // Reuse the access-token secret; the `purpose` claim keeps this token from being
    // accepted anywhere else, so no separate env key is required.
    private secret(): string {
        return this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET');
    }
}
