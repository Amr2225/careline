import type { BloodType as PrismaBloodType, Gender as PrismaGender } from "@careline/shared/prisma/client";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

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
    dateOfBirth: Date;
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
    dateOfBirth: Date;
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
    name?: string;
    email?: string;
    isActive?: boolean;
    medicalNotes?: string;
    gender?: Gender;
    bloodType?: BloodType;
}


export interface Patient {
    patientId?: string;
    userId: string;
    name: string; // This needs work
    phoneNumber: string;
    email: string;

    dateOfBirth: Date;
    gender: Gender;
    address?: string | null;
    emergencyContactName?: string | null;
    emergencyContactPhone?: string | null;
    bloodType?: PrismaBloodType | null;
    allergies?: string | null;
    chronicConditions?: string | null;
    currentMedications?: string | null;
    medicalNotes?: string | null;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}