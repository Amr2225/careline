import { verifyPassword } from '@/common/password.utils';
import { UserService } from '@/user/user.service';
import { UserEntity, UserWithoutPassword } from '@careline/shared/types/user.type';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import moment, { Duration, unitOfTime } from 'moment';
import { ConfigService } from '@nestjs/config';
import { DbService } from '@/db/db.service';
import { createHash } from 'crypto';
import { RbacService } from '@/rbac/rbac.service';

export interface Tokens {
    accessToken: {
        value: string;
        expiresIn: number;
    };
    refreshToken: {
        value: string;
        expiresIn: number;
    };
}


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly rbacService: RbacService,
        private readonly db: DbService
    ) { }

    async validateUser(userData: LoginDto): Promise<UserEntity> {
        const user = await this.userService.findByEmail(userData.email);
        if (!user) throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);

        const isPasswordValid = await verifyPassword(userData.password, user.passwordHash);
        if (!isPasswordValid) throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);

        if (!user.isActive) throw new HttpException("User is deactivated", HttpStatus.UNAUTHORIZED);

        const roles = await this.rbacService.getRoles(user.id);
        const permissions = await this.rbacService.getPremissionsForUser(user.id);

        const userEntity = {
            ...user,
            passwordHash: undefined,
            isBootstrapAdmin: undefined,
            roles,
            permissions: Array.from(permissions)
        };

        return userEntity;
    }

    async login(user: UserWithoutPassword): Promise<Tokens> {
        const { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = this.generateExpiresIn('ACCESS_TOKEN_EXPIRES_IN', 'REFRESH_TOKEN_EXPIRES_IN');
        const accessToken = await this.jwtService.signAsync({ userId: user.id }, { subject: user.id, expiresIn: ACCESS_TOKEN_EXPIRES_IN, secret: this.configService.getOrThrow<string>("ACCESS_TOKEN_SECRET") });
        const refreshToken = await this.jwtService.signAsync({ userId: user.id }, { subject: user.id, expiresIn: REFRESH_TOKEN_EXPIRES_IN, secret: this.configService.getOrThrow<string>("REFRESH_TOKEN_SECRET") });

        await this.db.user.update({
            where: { id: user.id },
            data: {
                refreshTokens: {
                    create: {
                        tokenHash: createHash('sha256').update(refreshToken).digest('hex'),
                        expiresAt: moment.utc().add(REFRESH_TOKEN_EXPIRES_IN, 'ms').toDate()
                    }
                }
            }
        })

        const tokens = {
            accessToken: {
                value: accessToken,
                expiresIn: ACCESS_TOKEN_EXPIRES_IN
            },
            refreshToken: {
                value: refreshToken,
                expiresIn: REFRESH_TOKEN_EXPIRES_IN
            }
        }

        return tokens;
    }

    async me(userId: string): Promise<UserEntity> {
        return await this.userService.findById(userId);
    }

    async logout(userId: string) {
        await this.db.refreshToken.updateMany({
            where: {
                userId: userId
            },
            data: {
                revokedAt: new Date()
            }
        })
    }

    async validateRefreshToken(refreshToken: string): Promise<UserWithoutPassword> {
        const refreshTokenEntity = await this.db.refreshToken.findFirst({
            where: {
                tokenHash: createHash('sha256').update(refreshToken).digest('hex'),
                revokedAt: null,
                expiresAt: {
                    gt: new Date()
                }
            },
            include: {
                user: {
                    omit: {
                        passwordHash: true,
                        isBootstrapAdmin: true,
                    }
                }
            }
        })

        console.log("Refresh Token Entity", refreshTokenEntity);
        if (!refreshTokenEntity) throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);

        // Theft protection some one is using a revoked refresh token
        if (refreshTokenEntity.revokedAt && refreshTokenEntity.revokedAt > new Date()) {
            await this.db.refreshToken.update({
                where: {
                    id: refreshTokenEntity.id
                },
                data: {
                    revokedAt: new Date()
                }
            })

            throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }


        return refreshTokenEntity.user;
    }

    private generateExpiresIn<T extends string>(...envs: T[]): Record<T, number> {
        const result = {} as Record<T, number>;

        for (const key of envs) {
            const expiresIn = this.configService.getOrThrow<string>(key);
            if (!expiresIn) {
                throw new InternalServerErrorException(`${key} is not set`);
            }

            const [time, unit] = expiresIn.split(" ") as [Duration, unitOfTime.DurationConstructor];
            if (!time || !unit) {
                throw new InternalServerErrorException('JWT_EXPIRES_IN is not valid. It should be like "number unit"');
            }

            result[key] = moment.duration(time, unit).asMilliseconds();
        }

        return result;
    }

    async setCookies<T extends Response>(response: T, key: string, value: string, expiresIn: number) {
        response.cookie(key, value, {
            httpOnly: true,
            secure: true, // TODO: Change to false in development
            sameSite: 'strict',
            // expires: moment().add(expiresIn, 'ms').toDate(),
            expires: new Date(Date.now() + expiresIn),
            path: "/"
        });
    }
}
