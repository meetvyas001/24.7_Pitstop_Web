import { IsString, IsEmail, IsOptional, IsNumber, IsDate, IsArray, IsEnum, IsMongoId, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { VerificationStatus } from '../enums/verification.enum';

export class CreateAuthUserDto {
    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @IsString()
    @MaxLength(50)
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    @IsString()
    @MaxLength(50)
    lastName: string;

    @ApiProperty({ example: 'mechanic', description: 'User role' })
    @IsString()
    contactNumber: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password for the account' })
    @IsString()
    @MinLength(6)
    @MaxLength(8)
    password: string;

    @ApiPropertyOptional({ example: '1990-01-01', description: 'Date of birth' })
    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @ApiPropertyOptional({ example: 40.7128, description: 'Latitude coordinate' })
    @IsNotEmpty()
    @IsNumber()
    lat : number;

    @ApiPropertyOptional({ example: -74.0060, description: 'Longitude coordinate' })
    @IsNotEmpty()
    @IsNumber()
    lng : number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    shopName?: string;

    @ApiPropertyOptional({ example: 5, description: 'Years of experience as a mechanic' })
    @IsOptional()
    @IsNumber()
    yearsOfExperience?: number;

    @ApiPropertyOptional({ 
        example: ['Brake Systems', 'Engine Repair'], 
        description: 'Areas of expertise' 
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MaxLength(5, { each: true })
    expertise?: string[];

    @ApiPropertyOptional({ 
        example: 'ML123456', 
        description: 'Mechanic license number' 
    })
    @IsOptional()
    @IsString()
    mechanicLicense?: string;

    @ApiPropertyOptional({ 
        example: ['ASE Master Tech', 'BMW Certified'], 
        description: 'Professional certifications' 
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    certifications?: string[];
}
