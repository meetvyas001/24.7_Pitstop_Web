import { Module } from '@nestjs/common';
import { MechanicService } from './mechanic.service';
import { ServiceController } from './service.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './entities/service.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthUser, AuthUserSchema } from 'src/auth-user/entities/auth-user.entity';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports : [MongooseModule.forFeature([{ name : Service.name, schema : ServiceSchema }, { name : AuthUser.name, schema : AuthUserSchema }])],
  controllers: [ServiceController],
  providers: [MechanicService, JwtService, UploadService],
})
export class ServiceModule {}
