import type { BloodType as PrismaBloodType, Gender as PrismaGender } from "@careline/shared/prisma/client";
import { Pagination } from "./pagination.type";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export const GenderConst = {
    MALE: "MALE",
    FEMALE: "FEMALE",
} as const

export const GenderLabel: Record<Gender, string> = {
    MALE: "Male",
    FEMALE: "Female",
}

export enum BloodType {
    A_POS = "A_POS",
    A_NEG = "A_NEG",
    B_POS = "B_POS",
    B_NEG = "B_NEG",
    AB_POS = "AB_POS",
    AB_NEG = "AB_NEG",
    O_POS = "O_POS",
    O_NEG = "O_NEG",
    UNKNOWN = "UNKNOWN",
}
export const BloodTypeLabel: Record<BloodType, string> = {
    A_POS: "A+",
    A_NEG: "A-",
    B_POS: "B+",
    B_NEG: "B-",
    AB_POS: "AB+",
    AB_NEG: "AB-",
    O_POS: "O+",
    O_NEG: "O-",
    UNKNOWN: "Unknown",
}

export interface CreatePatientWithUserPayload {
    // User Fields
    email: string;
    name: string;
    password: string;
    phoneNumber: string;

    // Patient Fields
    dateOfBirth: string;// Assess this might need to be date
    gender: Gender;
    address?: string | null;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    bloodType?: BloodType;
    allergies?: string;
    chronicConditions?: string;
    currentMedications?: string;
}

export interface CreatePatientPayload {
    userId: string;
    dateOfBirth: string;
    gender: Gender;
    address?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    bloodType?: BloodType;
    allergies?: string;
    chronicConditions?: string;
    currentMedications?: string;
}

export type UpdatePatientPayload = Partial<CreatePatientPayload>

export interface UpdatePatientMedicalPayload {
    medicalNotes: string;
}

export interface ListPatientQuery {
    limit: number;
    page: number;
    name?: string;
    phoneNumber?: string;
    email?: string;
    isActive?: boolean;
    medicalNotes?: string;
    gender?: Gender;
    bloodType?: BloodType;
}

interface PatientStats {
    totalActive: number;
    totalInactive: number;
    seenThisMonth: number;
}

export interface PaginatedPatientList {
    data: Patient[]
    meta: Pagination & PatientStats
}

export interface Patient {
    patientId?: string;
    userId: string;
    name: string; // This needs work
    phoneNumber: string;
    email: string;

    dateOfBirth: string; // YYYY-MM-DDTHH:MM:SS.SSSZ
    gender: Gender;
    address?: string | null;
    emergencyContactName?: string | null;
    emergencyContactPhone?: string | null;
    bloodType?: BloodType | null;
    allergies?: string | null;
    chronicConditions?: string | null;
    currentMedications?: string | null;
    medicalNotes?: string | null;
    isActive?: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}