import { PUBLIC_KEY } from "@/rbac/decorator/public.decorator";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

// Tries the staff strategy then the patient strategy; either may authenticate a
// shared endpoint. Each strategy reads only its own cookie and asserts its audience,
// so there is no cross-cookie fallback within a single extractor.
@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt-staff', 'jwt-patient']) {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        return super.canActivate(context);
    }
}