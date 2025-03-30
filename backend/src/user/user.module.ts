import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthUser, AuthUserSchema } from 'src/auth-user/entities/auth-user.entity';
import { ServiceRequest, ServiceRequestSchema } from 'src/service-request/entities/service-request.entity';

@Module({
  imports : [MongooseModule.forFeature([{ name : User.name, schema : UserSchema }, { name : AuthUser.name, schema : AuthUserSchema }, { name : ServiceRequest.name, schema : ServiceRequestSchema}]), 
  ConfigModule.forRoot({
    envFilePath : `../config/.env.${process.env.NODE_ENV || 'development'}`,
    isGlobal : true
  }),
  JwtModule.registerAsync(
    {
      useFactory : async (configService : ConfigService) => ({
        secret : configService.get('JWT_SECRET'),
      }),
      inject : [ConfigService]
    }
  )
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
