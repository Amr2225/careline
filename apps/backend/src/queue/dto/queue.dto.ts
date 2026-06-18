import { IsNotEmpty, IsString } from 'class-validator';

export class WalkInCheckInDto {
    @IsString()
    @IsNotEmpty()
    token: string;
}

export class CallTicketDto {
    @IsString()
    @IsNotEmpty()
    doctorId: string;
}
