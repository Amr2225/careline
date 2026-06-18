// Cookie names per audience. Staff dashboard and patient PWA keep separate
// sessions so signing into one never grants access to the other.
export const STAFF_COOKIES = {
    access: 'accessToken',
    refresh: 'refreshToken',
} as const;

export const PATIENT_COOKIES = {
    access: 'patientAccessToken',
    refresh: 'patientRefreshToken',
} as const;

// Audience is baked into every token as a claim and asserted on every
// access/refresh validation, so a patient token can never be replayed against a
// staff endpoint (or vice versa) — closing audience-confusion / session promotion.
export type Audience = 'staff' | 'patient';

export const STAFF_AUDIENCE: Audience = 'staff';
export const PATIENT_AUDIENCE: Audience = 'patient';
