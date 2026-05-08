import { ModuleName } from "@careline/shared/types/modules.type"
import { Action } from "@careline/shared/types/rbac.type"
import { SetMetadata } from "@nestjs/common"

export const REQUIRES_KEY = 'requires'
export const Requires = (module: ModuleName, action: Action) => SetMetadata(REQUIRES_KEY, { module, action })