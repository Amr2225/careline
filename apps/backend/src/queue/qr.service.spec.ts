import { BadRequestException } from '@nestjs/common';
import { QrService } from './qr.service';
import { WALK_IN_TOKEN_PURPOSE, WALK_IN_TOKEN_TTL_SECONDS } from './queue.constants';

function makeConfig() {
    return {
        getOrThrow: jest.fn((key: string) => (key === 'PWA_ORIGIN' ? 'https://pwa.test' : 'access-secret')),
    };
}

describe('QrService', () => {
    let jwt: { signAsync: jest.Mock; verifyAsync: jest.Mock };
    let config: ReturnType<typeof makeConfig>;
    let service: QrService;

    beforeEach(() => {
        jwt = { signAsync: jest.fn().mockResolvedValue('signed.jwt'), verifyAsync: jest.fn() };
        config = makeConfig();
        service = new QrService(jwt as any, config as any);
    });

    describe('buildCheckInQr', () => {
        it('signs a purpose-claimed token and embeds it in the PWA deep link', async () => {
            const result = await service.buildCheckInQr();

            expect(jwt.signAsync).toHaveBeenCalledWith(
                { purpose: WALK_IN_TOKEN_PURPOSE },
                expect.objectContaining({ expiresIn: WALK_IN_TOKEN_TTL_SECONDS }),
            );
            expect(result).toEqual({
                token: 'signed.jwt',
                url: 'https://pwa.test/walk-in?token=signed.jwt',
                expiresInSeconds: WALK_IN_TOKEN_TTL_SECONDS,
            });
        });
    });

    describe('verifyCheckInToken', () => {
        it('accepts a token carrying the walk-in purpose', async () => {
            jwt.verifyAsync.mockResolvedValue({ purpose: WALK_IN_TOKEN_PURPOSE });
            await expect(service.verifyCheckInToken('signed.jwt')).resolves.toBeUndefined();
        });

        it('rejects an expired or malformed token', async () => {
            jwt.verifyAsync.mockRejectedValue(new Error('jwt expired'));
            await expect(service.verifyCheckInToken('stale')).rejects.toBeInstanceOf(BadRequestException);
        });

        it('rejects a validly-signed token with the wrong purpose', async () => {
            jwt.verifyAsync.mockResolvedValue({ purpose: 'something-else' });
            await expect(service.verifyCheckInToken('other')).rejects.toBeInstanceOf(BadRequestException);
        });
    });
});
