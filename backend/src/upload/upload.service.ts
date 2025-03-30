import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
import { ResponseHandler } from 'src/common/helpers/responseHandler';

@Injectable()
export class UploadService {
    constructor(private configService: ConfigService) {
        v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET')
        })
    }

    async uploadFile(file: Express.Multer.File) {
        console.log(path.resolve('./uploads'));
        const filePath = path.join(__dirname, '..', '..', 'tmp', file.originalname);
        
        try {            
            // Write file to disk
            fs.writeFileSync(filePath, file.buffer);
            
            // Upload to cloudinary
            const result = await v2.uploader.upload(filePath, { folder: 'pitstop' });
            return new ResponseHandler('File uploaded successfully', 200, true, result);
        } catch (error) {
            console.log('Error uploading file:', error);
            throw error;
        } finally {
            // Clean up: remove temporary file
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error('Error cleaning up temporary file:', err);
            }
        }
    }
}