import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches('/^\S+@\S+\.\S+$/')
    email : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address : string
}

