import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RbacService } from "../rbac.service";
import { Reflector } from "@nestjs/core";
import { Action } from "@careline/shared/types/rbac.type";
import { REQUIRES_KEY } from "../decorator/requires.decorator";

@Injectable()
export class RbacGuard implements CanActivate {
    constructor(private readonly rbacService: RbacService, private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<{ module: string; action: Action }>(REQUIRES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermissions) return true;

        const request = context.switchToHttp().getRequest();
        if (!request?.user?.id) return false;
        const userId = request.user.id;

        console.log(requiredPermissions, userId);

        // const permissions = await this.rbacService.getPremissionsForUser(userId);
        // const isFound = await this.rbacService.has(permissions, requiredPermissions.module, requiredPermissions.action);
        // if (!isFound) return false;

        const hasPermission = await this.rbacService.hasPermission(userId, requiredPermissions.module, requiredPermissions.action);
        return hasPermission;
    }
}