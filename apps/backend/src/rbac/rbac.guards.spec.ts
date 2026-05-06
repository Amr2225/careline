import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Action } from '@careline/shared/types/rbac.type';
import { REQUIRES_KEY } from './decorator/requires.decorator';
import { RbacGuard } from './guards/rbac.guard';
import { RbacService } from './rbac.service';

type RbacServiceMock = {
    hasPermission: jest.Mock;
};

type ReflectorMock = {
    getAllAndOverride: jest.Mock;
};

describe('RbacGuard', () => {
    let guard: RbacGuard;
    let rbacService: RbacServiceMock;
    let reflector: ReflectorMock;

    const requiredPermission = {
        module: 'Patients',
        action: Action.READ,
    };

    const createContext = (user?: { id: string }): ExecutionContext => {
        const handler = jest.fn();
        const controller = jest.fn();
        const request = { user };

        return {
            getHandler: () => handler,
            getClass: () => controller,
            switchToHttp: () => ({
                getRequest: () => request,
            }),
        } as unknown as ExecutionContext;
    };

    beforeEach(() => {
        rbacService = {
            hasPermission: jest.fn(),
        };

        reflector = {
            getAllAndOverride: jest.fn(),
        };

        guard = new RbacGuard(
            rbacService as unknown as RbacService,
            reflector as unknown as Reflector,
        );
    });

    it('returns true when no @Requires metadata exists', async () => {
        reflector.getAllAndOverride.mockReturnValue(undefined);

        await expect(guard.canActivate(createContext())).resolves.toBe(true);

        expect(reflector.getAllAndOverride).toHaveBeenCalledWith(REQUIRES_KEY, [
            expect.any(Function),
            expect.any(Function),
        ]);
        expect(rbacService.hasPermission).not.toHaveBeenCalled();
    });

    it('returns true when the authenticated user has the required permission', async () => {
        reflector.getAllAndOverride.mockReturnValue(requiredPermission);
        rbacService.hasPermission.mockResolvedValue(true);

        await expect(guard.canActivate(createContext({ id: 'user-1' }))).resolves.toBe(true);

        expect(rbacService.hasPermission).toHaveBeenCalledWith(
            'user-1',
            requiredPermission.module,
            requiredPermission.action,
        );
    });

    it('returns false when the authenticated user lacks the required permission', async () => {
        reflector.getAllAndOverride.mockReturnValue(requiredPermission);
        rbacService.hasPermission.mockResolvedValue(false);

        await expect(guard.canActivate(createContext({ id: 'user-1' }))).resolves.toBe(false);
    });

    it('returns false when route requires permission and user is unauthenticated', async () => {
        reflector.getAllAndOverride.mockReturnValue(requiredPermission);

        await expect(guard.canActivate(createContext())).resolves.toBe(false);

        expect(rbacService.hasPermission).not.toHaveBeenCalled();
    });
});
