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
]

export function hasPermission(
  permissions: string[] | undefined,
  module: ModuleName,
  action: Action
): boolean {
  if (!permissions) return false
  return permissions.includes(`${module}:${action.toLowerCase()}`)
}
