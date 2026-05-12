import { DbService } from '@/db/db.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePatientMedicalDto } from './dto/update-patient.dto';
import { Patient } from '@careline/shared/types/patient.type';
import { CreatePatientDto, CreatePatientWithUserDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ListPatientQueryDto, UserWithPatientRoleSearch } from './dto/list-patient-query.dto';
import { Prisma } from '@careline/shared/prisma/client';
import { PatientIncludeUser, transformPatient, transformUserToPatient, UserIncludePatient } from '@/common/transformUser.utils';
import { hashPassword } from '@/common/password.utils';
import { verifyPhoneNumber } from '@/common/phone.utils';
import { skipUndefined } from '@/common/skipUndefined.utils';
import { UserWithoutPassword } from '@careline/shared/types/user.type';

@Injectable()
export class PatientService {
    constructor(private readonly dbService: DbService) { }

    async listPatients(listPatientQueryDto: ListPatientQueryDto = {}): Promise<Patient[]> {
        const patients: Patient[] = [];

        let patientWhere: Prisma.PatientWhereInput = {};
        let userWhere: Prisma.UserWhereInput = {};
        userWhere.userRoles = {
            some: {
                role: {
                    name: "Patient"
                }
            },
        }

        patientWhere.OR = []
        userWhere.OR = []

        // Users Fields
        if (listPatientQueryDto.name) userWhere.OR.push({ name: { contains: listPatientQueryDto.name, mode: "insensitive" } })
        if (listPatientQueryDto.email) userWhere.OR.push({ email: { contains: listPatientQueryDto.email, mode: "insensitive" } })
        if (listPatientQueryDto.isActive !== undefined) userWhere.isActive = listPatientQueryDto.isActive;
        if (listPatientQueryDto.phoneNumber) {
            const validPhoneNumber = verifyPhoneNumber(listPatientQueryDto.phoneNumber);
            userWhere.OR.push({ phoneNumber: validPhoneNumber });
        }

        // Patients Fields
        if (listPatientQueryDto.bloodType) patientWhere.OR.push({ bloodType: listPatientQueryDto.bloodType });
        if (listPatientQueryDto.medicalNotes) patientWhere.OR.push({ medicalNotes: { contains: listPatientQueryDto.medicalNotes, mode: "insensitive" } });
        if (listPatientQueryDto.gender) patientWhere.gender = listPatientQueryDto.gender;

        // Check for empty queries and set them to Prisma.skip (Because prisma will return no data if the OR array is empty)
        userWhere = { ...userWhere, OR: userWhere.OR.length > 0 ? userWhere.OR : Prisma.skip }
        patientWhere = { ...patientWhere, OR: patientWhere.OR.length > 0 ? patientWhere.OR : Prisma.skip }


        const users = await this.dbService.user.findMany({
            where: userWhere,
            omit: {
                passwordHash: true,
                isBootstrapAdmin: true,
            },
            include: {
                patient: { where: patientWhere }
            }
        });

        if (!users.length) return [];

        for (const user of users) {
            if (!user.patient) continue;

            patients.push(transformUserToPatient(user as UserIncludePatient));
        }
        return patients;

    }

    async getUsersWithPatientRole(filters: UserWithPatientRoleSearch = {}): Promise<UserWithoutPassword[]> {
        let where: Prisma.UserWhereInput = {}
        where.userRoles = {
            some: {
                role: { name: "Patient" }
            }
        }
        where.patient = null;
        where.OR = []

        if (filters.search) {
            where.OR.push({ name: { contains: filters.search, mode: "insensitive" } })
            where.OR.push({ email: { contains: filters.search, mode: "insensitive" } })
            where.OR.push({ phoneNumber: { contains: filters.search, mode: "insensitive" } })
        }

        where = { ...where, OR: where.OR.length > 0 ? where.OR : Prisma.skip }

        return await this.dbService.user.findMany({
            where,
            omit: {
                passwordHash: true,
                isBootstrapAdmin: true
            }
        });
    }

    async getPatient(patientId: string): Promise<Patient> {
        try {
            const patient = await this.dbService.patient.findUnique({
                where: { id: patientId },
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            if (!patient) throw new BadRequestException("Patient not found");

            return transformPatient(patient as PatientIncludeUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("Patient not found");
            }

            throw error;
        }
    }

    async createPatientWithUser(requestUserId: string, patient: CreatePatientWithUserDto): Promise<Patient> {
        // TODO: Validate the phone number in a seperate validationPipe
        if (!patient.phoneNumber) throw new BadRequestException("Phone number is required"); // Check for phone number in because it is optional in the userDTO but for a patient we must check for it.
        const validPhoneNumber = verifyPhoneNumber(patient.phoneNumber);

        if (patient.emergencyContactPhone) {
            const validEmergencyContactPhone = verifyPhoneNumber(patient.emergencyContactPhone);
            patient.emergencyContactPhone = validEmergencyContactPhone;
        }

        try {
            const patientUser = await this.dbService.user.create({
                data: {
                    name: patient.name,
                    email: patient.email,
                    passwordHash: await hashPassword(patient.password),
                    phoneNumber: validPhoneNumber,
                    patient: {
                        create: {
                            dateOfBirth: new Date(patient.dateOfBirth),
                            gender: patient.gender,
                            address: skipUndefined(patient.address),
                            emergencyContactName: skipUndefined(patient.emergencyContactName),
                            emergencyContactPhone: skipUndefined(patient.emergencyContactPhone),
                            bloodType: skipUndefined(patient.bloodType),
                            allergies: skipUndefined(patient.allergies),
                            chronicConditions: skipUndefined(patient.chronicConditions),
                            currentMedications: skipUndefined(patient.currentMedications),
                        },
                    },
                    userRoles: {
                        create: {
                            assignedBy: {
                                connect: {
                                    id: requestUserId
                                }
                            },
                            role: {
                                connect: {
                                    name: "Patient"
                                }
                            }
                        }
                    }
                },
                omit: {
                    passwordHash: true,
                    isBootstrapAdmin: true
                },
                include: {
                    patient: true
                }
            })

            return transformUserToPatient(patientUser as UserIncludePatient);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new BadRequestException("User with the same email or phone number already exists");
            }

            throw error;
        }
    }

    async createPatient(patient: CreatePatientDto): Promise<Patient> {
        try {
            const user = await this.dbService.user.findUnique({
                where: {
                    id: patient.userId,
                    AND: {
                        userRoles: {
                            some: {
                                role: {
                                    name: "Patient"
                                }
                            }
                        }
                    }
                },
                select: {
                    id: true,
                }
            })

            if (!user) throw new BadRequestException("User not found or does not have the Patient role");

            const patientData = await this.dbService.patient.create({
                data: {
                    dateOfBirth: new Date(patient.dateOfBirth),
                    gender: patient.gender,
                    address: skipUndefined(patient.address),
                    emergencyContactName: skipUndefined(patient.emergencyContactName),
                    emergencyContactPhone: skipUndefined(patient.emergencyContactPhone),
                    bloodType: skipUndefined(patient.bloodType),
                    allergies: skipUndefined(patient.allergies),
                    chronicConditions: skipUndefined(patient.chronicConditions),
                    currentMedications: skipUndefined(patient.currentMedications),
                    userId: user.id,
                },
                include: {
                    user: {
                        omit: {
                            passwordHash: true,
                            isBootstrapAdmin: true,
                        }
                    }
                }
            });

            return transformPatient(patientData as PatientIncludeUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new BadRequestException("Patient with the same user already exists");
            }

            throw error;
        }
    }

    async updatePatient(patientId: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
        try {
            const patientData = await this.dbService.patient.update({
                where: { id: patientId },
                data: {
                    dateOfBirth: updatePatientDto.dateOfBirth ? new Date(updatePatientDto.dateOfBirth) : Prisma.skip,
                    gender: skipUndefined(updatePatientDto.gender),
                    address: skipUndefined(updatePatientDto.address),
                    emergencyContactName: skipUndefined(updatePatientDto.emergencyContactName),
                    emergencyContactPhone: skipUndefined(updatePatientDto.emergencyContactPhone),
                    bloodType: skipUndefined(updatePatientDto.bloodType),
                    allergies: skipUndefined(updatePatientDto.allergies),
                    chronicConditions: skipUndefined(updatePatientDto.chronicConditions),
                    currentMedications: skipUndefined(updatePatientDto.currentMedications),
                },
                include: {
                    user: {
                        omit: {
                            passwordHash: true,
                            isBootstrapAdmin: true
                        }
                    }
                },
            })

            return transformPatient(patientData as PatientIncludeUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("Patient not found");
            }

            throw error;
        }
    }

    async updatePatientMedical(patientId: string, updatePatientDto: UpdatePatientMedicalDto): Promise<Patient> {
        try {
            const patientData = await this.dbService.patient.update({
                where: { id: patientId },
                data: {
                    medicalNotes: skipUndefined(updatePatientDto.medicalNotes),
                },
                include: {
                    user: {
                        omit: {
                            passwordHash: true,
                            isBootstrapAdmin: true
                        }
                    }
                },
            });

            return transformPatient(patientData as PatientIncludeUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("Patient not found");
            }

            throw error;

        }
    }

    async deletePatient(patientId: string): Promise<Patient> {
        try {
            const patientData = await this.dbService.$transaction(async (tx) => {
                const patientData = await tx.patient.update({
                    where: {
                        id: patientId
                    },
                    data: {
                        user: {
                            update: {
                                isActive: false
                            }
                        }
                    }
                });

                await tx.refreshToken.updateMany({
                    where: {
                        userId: patientData.userId,
                        revokedAt: null,
                    },
                    data: {
                        revokedAt: new Date()
                    }
                })

                return patientData;
            });

            return transformPatient(patientData as PatientIncludeUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("Patient not found");
            }

            throw error;

        }
    }

}
