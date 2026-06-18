import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JWTRefreshGuard extends AuthGuard('jwt-refresh-staff') { }

@Injectable()
export class JWTPatientRefreshGuard extends AuthGuard('jwt-refresh-patient') { }