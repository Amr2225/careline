import { Action, ModuleName } from "@careline/shared/types/rbac.type"
import { SetMetadata } from "@nestjs/common"

export const REQUIRES_KEY = 'requires'
export type RequiredPermission = `${ModuleName}:${Action}`
export const Requires = (permissions: RequiredPermission[]) => SetMetadata(REQUIRES_KEY, permissions);