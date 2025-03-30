import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateComplaintDto } from './create-complaint.dto';
import { IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ServiceRequestStatus } from '../enums/status.enum';

export class UpdateComplaintDto {
    @ApiProperty({
        enum: ServiceRequestStatus,
        enumName: 'ServiceRequestStatus',
        example: ServiceRequestStatus.PENDING,
        description: 'Status of the service request',
        examples: [
            ServiceRequestStatus.PENDING,
            ServiceRequestStatus.ACCEPTED,
            ServiceRequestStatus.IN_PROGRESS,
            ServiceRequestStatus.COMPLETED,
            ServiceRequestStatus.REJECTED
        ]
    })
    @IsEnum(ServiceRequestStatus)
    status: ServiceRequestStatus;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mechanicId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    serviceRequestId: string;
}
