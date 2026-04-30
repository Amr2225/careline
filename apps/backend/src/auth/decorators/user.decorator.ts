import { UserWithoutPassword } from '@careline/shared/types/user.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): UserWithoutPassword => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as UserWithoutPassword;
    },
);