import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { VehicleType } from "../enums/vehicle.enum";

export class CreateComplaintDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    vehicleType : any[]

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    lat: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    lng : number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    serviceId : string;
}


export class CombinedDto extends CreateComplaintDto {
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Vehicle image file'
    })
    file: Express.Multer.File;
}