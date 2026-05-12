import { BadRequestException } from '@nestjs/common';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import type { CountryCode } from 'node_modules/libphonenumber-js';

export function verifyPhoneNumber(phoneNumber: string, defaultCountryCode: CountryCode = "EG") {
    const parsedPhoneNumber = parsePhoneNumberWithError(phoneNumber, defaultCountryCode);
    if (!parsedPhoneNumber.isValid()) throw new BadRequestException("Invalid phone number");

    return parsedPhoneNumber.format("E.164");
}