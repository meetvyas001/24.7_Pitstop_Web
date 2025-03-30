import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsSemVer, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name : string
}
