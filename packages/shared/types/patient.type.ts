import type { BloodType as PrismaBloodType, Gender as PrismaGender } from "@careline/shared/prisma/client";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
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

export interface Patient {
    patientId?: string;
    userId: string;
    name: string; // This needs work
    dateOfBirth: Date;
    gender: PrismaGender;
    address?: string | null;
    emergencyContactName?: string | null;
    emergencyContactPhone?: string | null;
    bloodType?: PrismaBloodType | null;
    allergies?: string | null;
    chronicConditions?: string | null;
    currentMedications?: string | null;
    medicalNotes?: string | null;
    createdAt: Date;
    updatedAt: Date;
}