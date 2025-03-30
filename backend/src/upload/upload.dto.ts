import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FileUploadDto {
    @ApiProperty({
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      description: 'Attachment',
    })
    @IsNotEmpty()
    file: string;
  }