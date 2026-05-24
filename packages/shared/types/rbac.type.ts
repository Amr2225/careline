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

export const MODULE_NAMES = [
    'Users',
    'Roles',
    'Patients',
    'Appointments',
    'Queue',
    'Finance',
    'Stats',
    'Settings',
] as const;

export type ModuleName = typeof MODULE_NAMES[number];

export const SYSTEM_ROLES = {
    MANAGER: 'Manager',
    PATIENT: 'Patient',
    RECEPTIONIST: 'Receptionist',
    DOCTOR: 'Doctor',
    SCHEDULER: 'Scheduler',
} as const;
export type SystemRoleName = typeof SYSTEM_ROLES[keyof typeof SYSTEM_ROLES];