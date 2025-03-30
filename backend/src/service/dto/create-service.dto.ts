import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ServiceType } from "../enums/serviceType.enum";
import { VehicleType } from "src/service-request/enums/vehicle.enum";

export class CreateServiceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price : number;
}

export class CombinedCreateDto extends CreateServiceDto {
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Service image file'
    })
    file: Express.Multer.File;
}
