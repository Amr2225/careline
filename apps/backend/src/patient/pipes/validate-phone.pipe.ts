import { BadRequestException, ConflictException, Injectable, mixin, PipeTransform, Type } from "@nestjs/common";
import { DbService } from "@/db/db.service";
import { CreatePatientDto, CreatePatientWithUserDto } from "@/patient/dto/create-patient.dto";
import { verifyPhoneNumber } from "@/common/phone.utils";


export function ValidatePhoneNumber(phoneNumberRequired = true): Type<PipeTransform> {
    @Injectable()
    class ValidatePhoneNumberPipe implements PipeTransform {
        constructor(private readonly dbService: DbService,) { }

        async transform(values: CreatePatientWithUserDto & CreatePatientDto) {
            // Check for phone number in because it is optional in the userDTO but for a patient we must check for it.
            if (phoneNumberRequired) {
                if (!values.phoneNumber) {
                    throw new BadRequestException("Phone number is required");
                }

                const validPhoneNumber = verifyPhoneNumber(values.phoneNumber, "Invalid Phone Number");

                const user = await this.dbService.user.findUnique({ where: { phoneNumber: validPhoneNumber }, include: { patient: { select: { id: true } } } })
                if (user) throw new ConflictException({
                    message: `Phone ${validPhoneNumber} is already registred`,
                    existingUserId: user.id,
                    existingPatientId: user?.patient?.id
                })
                values.phoneNumber = validPhoneNumber
            }

            if (values.emergencyContactPhone) {
                const validEmergencyContactPhone = verifyPhoneNumber(values.emergencyContactPhone, "Invalid Emergency Contact Phone Number");
                values.emergencyContactPhone = validEmergencyContactPhone
            }

            return values;
        }
    }

    return mixin(ValidatePhoneNumberPipe)
}