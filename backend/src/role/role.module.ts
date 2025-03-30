import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { AuthUser, AuthUserSchema } from 'src/auth-user/entities/auth-user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [MongooseModule.forFeature([{ name : Role.name, schema : RoleSchema }, { name : AuthUser.name, schema : AuthUserSchema }])],
  controllers: [RoleController],
  providers: [RoleService, JwtService],
})
export class RoleModule {}
