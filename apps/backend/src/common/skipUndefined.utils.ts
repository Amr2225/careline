import { Prisma } from "@careline/shared/prisma/client";

export function skipUndefined<T>(value: T | undefined) {
    return value === undefined ? Prisma.skip : value;
}