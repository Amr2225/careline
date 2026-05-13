import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RbacService } from "../rbac.service";
import { Reflector } from "@nestjs/core";
import { RequiredPermission, REQUIRES_KEY } from "../decorator/requires.decorator";
import { Action, ModuleName } from "@careline/shared/types/rbac.type";

@Injectable()
export class RbacGuard implements CanActivate {
    constructor(private readonly rbacService: RbacService, private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndMerge<RequiredPermission[]>(REQUIRES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermissions || requiredPermissions.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const userId = request?.user?.id;
        if (!userId) return false;


        // console.log(requiredPermissions, userId);

        // const permissions = await this.rbacService.getPremissionsForUser(userId);
        // const isFound = await this.rbacService.has(permissions, requiredPermissions.module, requiredPermissions.action);
        // if (!isFound) return false;

        for (const permission of requiredPermissions) {
            const [module, action] = permission.split(":") as [ModuleName, Action];
            const ok = await this.rbacService.hasPermission(userId, module, action);

            if (!ok) return false;
        }

        return true

    }
}