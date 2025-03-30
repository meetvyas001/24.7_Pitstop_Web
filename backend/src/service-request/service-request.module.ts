import { Module } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestController } from './service-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceRequest, ServiceRequestSchema } from './entities/service-request.entity';
import { AuthUser, AuthUserSchema } from 'src/auth-user/entities/auth-user.entity';
import { Service, ServiceSchema } from 'src/service/entities/service.entity';
import { JwtService } from '@nestjs/jwt';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports : [MongooseModule.forFeature([{ name : ServiceRequest.name, schema : ServiceRequestSchema }, { name : AuthUser.name, schema : AuthUserSchema }, { name : Service.name, schema : ServiceSchema }])],
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService, JwtService, UploadService],
})
export class ServiceRequestModule {}
