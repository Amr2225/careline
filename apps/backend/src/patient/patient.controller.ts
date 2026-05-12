import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from '@careline/shared/types/patient.type';
import { CreatePatientDto, CreatePatientWithUserDto } from './dto/create-patient.dto';
import { UpdatePatientDto, UpdatePatientMedicalDto } from './dto/update-patient.dto';
import { User } from '@/auth/decorators/user.decorator';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { Action } from '@careline/shared/types/rbac.type';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Get()
    @Requires("Patients", Action.READ)
    async listPatients(): Promise<Patient[]> {
        return await this.patientService.listPatients();
    }

    @Get(':id')
    @Requires("Patients", Action.READ)
    async getPatient(@Param('id') id: string): Promise<Patient> {
        return await this.patientService.getPatient(id);
    }

    @Post()
    @Requires("Patients", Action.WRITE)
    async createPatient(@Body() patient: CreatePatientDto): Promise<Patient> {
        return await this.patientService.createPatient(patient);
    }

    @Post('with-user')
    @Requires("Patients", Action.WRITE)
    @Requires("Users", Action.UPDATE)
    async createPatientWithUser(@User() currentUser: UserWithoutPassword, @Body() patient: CreatePatientWithUserDto): Promise<Patient> {
        return await this.patientService.createPatientWithUser(currentUser.id, patient);
    }

    @Patch(':id')
    @Requires("Patients", Action.UPDATE)
    async updatePatient(@Param('id') patientId: string, @Body() patientData: UpdatePatientDto): Promise<Patient> {
        return await this.patientService.updatePatient(patientId, patientData);
    }

    @Patch(':id/medical')
    @Requires("Patients", Action.UPDATE_MEDICAL)
    async updatePatientMedical(@Param('id') patientId: string, @Body() patientData: UpdatePatientMedicalDto): Promise<Patient> {
        return await this.patientService.updatePatientMedical(patientId, patientData);
    }

    @Delete(':id')
    @Requires("Patients", Action.DELETE)
    async deletePatient(@Param('id') patientId: string): Promise<Patient> {
        return await this.patientService.deletePatient(patientId);
    }
}
