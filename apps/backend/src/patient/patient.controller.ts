import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PaginatedPatientList, Patient } from '@careline/shared/types/patient.type';
import { CreatePatientDto, CreatePatientWithUserDto } from './dto/create-patient.dto';
import { UpdatePatientDto, UpdatePatientMedicalDto } from './dto/update-patient.dto';
import { User } from '@/auth/decorators/user.decorator';
import type { UserWithoutPassword } from '@careline/shared/types/user.type';
import { Requires } from '@/rbac/decorator/requires.decorator';
import { ListPatientQueryDto, UserWithPatientRoleSearch } from './dto/list-patient-query.dto';
import { ValidatePhoneNumber } from './pipes/validate-phone.pipe';

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Get()
    @Requires(["Patients:READ"])
    async listPatients(@Query() filters: ListPatientQueryDto = { limit: 10, page: 1 }): Promise<PaginatedPatientList> {
        return await this.patientService.listPatients(filters);
    }

    @Get("/users")
    @Requires(["Patients:READ", "Users:READ"])
    async getUsersWithPatientRole(@Query() filters: UserWithPatientRoleSearch = {}): Promise<UserWithoutPassword[]> {
        return await this.patientService.getUsersWithPatientRole(filters);
    }

    @Get(':id')
    @Requires(["Patients:READ"])
    async getPatient(@Param('id') id: string): Promise<Patient> {
        return await this.patientService.getPatient(id);
    }

    @Post()
    @Requires(["Patients:WRITE"])
    async createPatient(@Body(ValidatePhoneNumber()) patient: CreatePatientDto): Promise<Patient> {
        return await this.patientService.createPatient(patient);
    }

    @Post('with-user')
    @Requires(["Patients:WRITE", "Users:WRITE"])
    async createPatientWithUser(@User() currentUser: UserWithoutPassword, @Body(ValidatePhoneNumber()) patient: CreatePatientWithUserDto): Promise<Patient> {
        return await this.patientService.createPatientWithUser(currentUser.id, patient);
    }

    @Patch(':id')
    @Requires(["Patients:UPDATE"])
    async updatePatient(@Param('id') patientId: string, @Body(ValidatePhoneNumber(false)) patientData: UpdatePatientDto): Promise<Patient> {
        return await this.patientService.updatePatient(patientId, patientData);
    }

    @Patch(':id/medical')
    @Requires(["Patients:UPDATE_MEDICAL"])
    async updatePatientMedical(@Param('id') patientId: string, @Body() patientData: UpdatePatientMedicalDto): Promise<Patient> {
        return await this.patientService.updatePatientMedical(patientId, patientData);
    }

    @Delete(':id')
    @Requires(["Patients:DELETE"])
    async deletePatient(@Param('id') patientId: string): Promise<Patient> {
        return await this.patientService.deletePatient(patientId);
    }
}
