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