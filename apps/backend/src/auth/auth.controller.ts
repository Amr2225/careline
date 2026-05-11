import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';
import type { Request, Response } from 'express';
import { JWTRefreshGuard } from '@/auth/guards/jwt-auth-refresh.guard';
import { UserEntity, type UserWithoutPassword } from '@careline/shared/types/user.type';
import { User } from '@/auth/decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { csrfConfig } from './config/csrf.config';
import { doubleCsrf } from 'csrf-csrf';
import { ConfigService } from '@nestjs/config';
import { Public } from '@/rbac/decorator/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) { }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response, @Req() request: Request): Promise<UserEntity> {
        const user = await this.authService.validateUser(loginDto);

        // We should add the user to the header manually if not using the LocalStrategy
        // Local Strategy is used to validate the user credentials and return the user object in the request header
        request.user = user;

        const tokens = await this.authService.login(user);
        await this.authService.setCookies<Response>(response, 'accessToken', tokens.accessToken.value, tokens.accessToken.expiresIn);
        await this.authService.setCookies<Response>(response, 'refreshToken', tokens.refreshToken.value, tokens.refreshToken.expiresIn);

        request.cookies.refreshToken = tokens.refreshToken.value;

        console.log("Refresh Token", request.cookies.refreshToken);
        const { generateCsrfToken } = doubleCsrf(csrfConfig(this.configService))
        generateCsrfToken(request, response)

        return user;
    }

    @Public()
    @Post("refresh")
    @UseGuards(JWTRefreshGuard)
    async refresh(@User() user: UserWithoutPassword, @Res({ passthrough: true }) response: Response, @Req() request: Request) {
        // If the request reaches hear that means that the refresh token is valid, it past the guard
        // And the user object is valid in the request header
        const userTokens = await this.authService.login(user)

        await this.authService.setCookies<Response>(response, 'accessToken', userTokens.accessToken.value, userTokens.accessToken.expiresIn);
        await this.authService.setCookies<Response>(response, 'refreshToken', userTokens.refreshToken.value, userTokens.refreshToken.expiresIn);

        request.cookies.refreshToken = userTokens.refreshToken.value;

        console.log("Refresh Token", request.cookies.refreshToken);
        const { generateCsrfToken } = doubleCsrf(csrfConfig(this.configService))
        generateCsrfToken(request, response)

        return response.status(200).send({ message: 'Refresh successful' });
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@User() user: UserWithoutPassword, @Res({ passthrough: true }) response: Response) {
        await this.authService.logout(user.id);

        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
        response.clearCookie('csrfToken');

        return response.status(200).send({ message: 'Logout successful' });
    }

    @Get('me')
    async me(@User() user: UserWithoutPassword): Promise<UserEntity> {
        return await this.authService.me(user.id);
    }
}
