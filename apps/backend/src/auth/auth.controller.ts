import { Controller, Get, Post, Req, Res, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';
import type { Request, Response } from 'express';
import { JWTRefreshGuard, JWTPatientRefreshGuard } from '@/auth/guards/jwt-auth-refresh.guard';
import { UserEntity, type UserWithoutPassword } from '@careline/shared/types/user.type';
import { User } from '@/auth/decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { csrfConfig } from './config/csrf.config';
import { doubleCsrf } from 'csrf-csrf';
import { ConfigService } from '@nestjs/config';
import { Public } from '@/rbac/decorator/public.decorator';
import { PATIENT_AUDIENCE, PATIENT_COOKIES, STAFF_AUDIENCE, STAFF_COOKIES, type Audience } from './auth.constants';

type CookieNames = { access: string; refresh: string };

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) { }

    // Issues access + refresh cookies under the given names and binds a fresh CSRF
    // token to this session. Shared by the staff and patient login/refresh flows.
    private async issueSession(user: UserWithoutPassword, request: Request, response: Response, cookies: CookieNames, audience: Audience): Promise<void> {
        const tokens = await this.authService.login(user, audience);
        await this.authService.setCookies<Response>(response, cookies.access, tokens.accessToken.value, tokens.accessToken.expiresIn);
        await this.authService.setCookies<Response>(response, cookies.refresh, tokens.refreshToken.value, tokens.refreshToken.expiresIn);

        // The CSRF session identifier is read from the refresh cookie, so seed it on
        // the request before generating the token (the cookie itself is set on the response).
        request.cookies[cookies.refresh] = tokens.refreshToken.value;
        const { generateCsrfToken } = doubleCsrf(csrfConfig(this.configService));
        generateCsrfToken(request, response);
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response, @Req() request: Request): Promise<UserEntity> {
        const user = await this.authService.validateUser(loginDto);
        request.user = user;
        await this.issueSession(user, request, response, STAFF_COOKIES, STAFF_AUDIENCE);
        return user;
    }

    @Public()
    @Post('patient/login')
    async patientLogin(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response, @Req() request: Request): Promise<UserEntity> {
        const user = await this.authService.validatePatientUser(loginDto);
        request.user = user;
        await this.issueSession(user, request, response, PATIENT_COOKIES, PATIENT_AUDIENCE);
        return user;
    }

    @Public()
    @Post("refresh")
    @UseGuards(JWTRefreshGuard)
    async refresh(@User() user: UserWithoutPassword, @Res({ passthrough: true }) response: Response, @Req() request: Request) {
        // Guard accepts only a staff-audience refreshToken cookie, so this can't be
        // promoted from a patient session.
        await this.issueSession(user, request, response, STAFF_COOKIES, STAFF_AUDIENCE);
        return response.status(200).send({ message: 'Refresh successful' });
    }

    @Public()
    @Post("patient/refresh")
    @UseGuards(JWTPatientRefreshGuard)
    async patientRefresh(@User() user: UserWithoutPassword, @Res({ passthrough: true }) response: Response, @Req() request: Request) {
        // Re-check the Patient record still exists before re-issuing a PWA session.
        await this.authService.assertPatient(user.id);
        await this.issueSession(user, request, response, PATIENT_COOKIES, PATIENT_AUDIENCE);
        return response.status(200).send({ message: 'Refresh successful' });
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@User() user: UserWithoutPassword, @Res({ passthrough: true }) response: Response) {
        await this.authService.logout(user.id);

        response.clearCookie(STAFF_COOKIES.access);
        response.clearCookie(STAFF_COOKIES.refresh);
        response.clearCookie('csrfToken');

        return response.status(200).send({ message: 'Logout successful' });
    }

    @Post('patient/logout')
    @UseGuards(JwtAuthGuard)
    async patientLogout(@User() user: UserWithoutPassword, @Res({ passthrough: true }) response: Response) {
        await this.authService.logout(user.id);

        response.clearCookie(PATIENT_COOKIES.access);
        response.clearCookie(PATIENT_COOKIES.refresh);
        response.clearCookie('csrfToken');

        return response.status(200).send({ message: 'Logout successful' });
    }

    @Get('me')
    async me(@User() user: UserWithoutPassword): Promise<UserEntity> {
        return await this.authService.me(user.id);
    }

    @Get('patient/me')
    async patientMe(@User() user: UserWithoutPassword): Promise<UserEntity> {
        await this.authService.assertPatient(user.id);
        return await this.authService.me(user.id);
    }
}
