import { User } from "../prisma/client";
import { UserRoles } from "./rbac.type";

export type UserWithoutPassword = Omit<User, "passwordHash" | "refreshTokens" | "isBootstrapAdmin">
export type UserEntity = UserWithoutPassword & UserRoles