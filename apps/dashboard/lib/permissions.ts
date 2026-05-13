import { Action } from "@careline/shared/types/rbac.type"

export type ModuleName =
  | "Users"
  | "Roles"
  | "Patients"
  | "Appointments"
  | "Queue"
  | "Finance"
  | "Stats"
  | "Settings"

export const MODULE_NAMES: ModuleName[] = [
  "Users",
  "Roles",
  "Patients",
  "Appointments",
  "Queue",
  "Finance",
  "Stats",
  "Settings",
]

export const ACTIONS: Action[] = [
  Action.READ,
  Action.WRITE,
  Action.UPDATE,
  Action.DELETE,
  Action.UPDATE_MEDICAL,
]

const STANDARD_ACTIONS: Action[] = [
  Action.READ,
  Action.WRITE,
  Action.UPDATE,
  Action.DELETE,
]

export const MODULE_ACTIONS: Record<ModuleName, Action[]> = {
  Users: STANDARD_ACTIONS,
  Roles: STANDARD_ACTIONS,
  Patients: [...STANDARD_ACTIONS, Action.UPDATE_MEDICAL],
  Appointments: STANDARD_ACTIONS,
  Queue: STANDARD_ACTIONS,
  Finance: STANDARD_ACTIONS,
  Stats: STANDARD_ACTIONS,
  Settings: STANDARD_ACTIONS,
}

export function isActionApplicable(module: ModuleName, action: Action): boolean {
  return MODULE_ACTIONS[module].includes(action)
}

export function hasPermission(
  permissions: string[] | undefined,
  module: ModuleName,
  action: Action
): boolean {
  if (!permissions) return false
  return permissions.includes(`${module}:${action.toLowerCase()}`)
}
