import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { DbModule } from '@/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule { }
