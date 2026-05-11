export enum Action {
    READ = "READ",
    WRITE = "WRITE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    UPDATE_MEDICAL = "UPDATE_MEDICAL",
}

export type Role = {
    id: string;
    name: string;
}

export type UserRoles = {
    roles: Role[];
    permissions: string[];
};
