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
        dateOfBirth: user.patient!.dateOfBirth,
        gender: user.patient!.gender,
        address: user.patient?.address,
        emergencyContactName: user.patient?.emergencyContactName,
        emergencyContactPhone: user.patient?.emergencyContactPhone,
        bloodType: user.patient!.bloodType,
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
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        address: patient.address,
        emergencyContactName: patient.emergencyContactName,
        emergencyContactPhone: patient.emergencyContactPhone,
        bloodType: patient.bloodType,
        allergies: patient.allergies,
        chronicConditions: patient.chronicConditions,
        currentMedications: patient.currentMedications,
        medicalNotes: patient.medicalNotes,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
    }
}