import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from '@careline/shared/types/patient.type';
import { CreatePatientDto, CreatePatientWithUserDto } from './dto/create-patient.dto';
import { UpdatePatientDto, UpdatePatientMedicalDto } from './dto/update-patient.dto';
import { User } from '@/auth/decorators/user.decorator';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Get()
    async listPatients(): Promise<Patient[]> {
        return await this.patientService.listPatients();
    }

    @Get(':id')
    async getPatient(@Param('id') id: string): Promise<Patient> {
        return await this.patientService.getPatient(id);
    }

    @Post()
    async createPatient(@Body() patient: CreatePatientDto): Promise<Patient> {
        return await this.patientService.createPatient(patient);
    }

    @Post('with-user')
    async createPatientWithUser(@User() currentUser: UserWithoutPassword, @Body() patient: CreatePatientWithUserDto): Promise<Patient> {
        return await this.patientService.createPatientWithUser(currentUser.id, patient);
    }

    @Patch(':id')
    async updatePatient(@Param('id') patientId: string, @Body() patientData: UpdatePatientDto): Promise<Patient> {
        return await this.patientService.updatePatient(patientId, patientData);
    }

    @Patch(':id/medical')
    async updatePatientMedical(@Param('id') patientId: string, @Body() patientData: UpdatePatientMedicalDto): Promise<Patient> {
        return await this.patientService.updatePatientMedical(patientId, patientData);
    }

    @Delete(':id')
    async deletePatient(@Param('id') patientId: string): Promise<Patient> {
        return await this.patientService.deletePatient(patientId);
    }
}
