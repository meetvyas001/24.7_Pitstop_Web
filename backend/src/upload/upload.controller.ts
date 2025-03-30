import { Controller, Injectable, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { FileUploadDto } from './upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService : UploadService
    ) {}
    @ApiConsumes('multipart/form-data')
    @ApiProperty({
        type: FileUploadDto
    })
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file : Express.Multer.File)  {
        return this.uploadService.uploadFile(file);
    }
}
