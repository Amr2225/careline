import type { Prisma } from "@careline/shared/prisma/client"
import type { Patient } from "@careline/shared/types/patient.type"

export type UserIncludePatient = Prisma.UserGetPayload<{
    include: {
        patient: true
    }
}>

export type PatientIncludeUser = Prisma.PatientGetPayload<{
    include: {
        user: true
    }
}>

export function transformUserToPatient(user: UserIncludePatient): Patient {
    return {
        patientId: user.patient?.id,
        userId: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber ?? "",
        isActive: user.isActive,
        dateOfBirth: user.patient!.dateOfBirth.toISOString().slice(0, 10),
        gender: user.patient!.gender as any,
        address: user.patient?.address,
        emergencyContactName: user.patient?.emergencyContactName,
        emergencyContactPhone: user.patient?.emergencyContactPhone,
        bloodType: user.patient!.bloodType as any,
        allergies: user.patient?.allergies,
        chronicConditions: user.patient?.chronicConditions,
        currentMedications: user.patient?.currentMedications,
        medicalNotes: user.patient?.medicalNotes,
        createdAt: user.patient!.createdAt,
        updatedAt: user.patient!.updatedAt,
    }
}

export function transformPatient(patient: PatientIncludeUser): Patient {
    return {
        patientId: patient.id,
        userId: patient.userId,
        name: patient.user.name,
        email: patient.user.email,
        phoneNumber: patient.user.phoneNumber ?? "",
        isActive: patient.user.isActive,
        dateOfBirth: patient.dateOfBirth.toISOString().slice(0, 10),
        gender: patient.gender as any,
        address: patient.address,
        emergencyContactName: patient.emergencyContactName,
        emergencyContactPhone: patient.emergencyContactPhone,
        bloodType: patient.bloodType as any,
        allergies: patient.allergies,
        chronicConditions: patient.chronicConditions,
        currentMedications: patient.currentMedications,
        medicalNotes: patient.medicalNotes,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
    }
}