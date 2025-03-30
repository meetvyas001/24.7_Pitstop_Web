import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AdminController, AuthUserController } from './auth-user.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './entities/auth-user.entity';
import { Role, RoleSchema } from 'src/role/entities/role.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports : [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory : (configService : ConfigService)=> ({
        secret : configService.get('JWT_SECRET')
      }),
      inject : [ConfigService]
    }),
    MongooseModule.forFeature([{ name : AuthUser.name, schema : AuthUserSchema }, {name : Role.name, schema : RoleSchema}])],  
  controllers: [AuthUserController, AdminController],
  providers: [AuthUserService, JwtService],
})
export class AuthUserModule {}
