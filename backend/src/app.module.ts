import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './auth-user/auth-user.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { ServiceRequestModule } from './service-request/service-request.module';
import { ServiceModule } from './service/service.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : `./config/.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal : true
    }),
    MongooseModule.forRootAsync({
      useFactory : (configService : ConfigService) => ({
        uri : configService.get('MONGODB_URI'),
        maxPoolSize : 10,
        autoCreate : true
      }),
      inject : [ConfigService]
    }),
    AuthUserModule, UserModule, RoleModule, ServiceRequestModule, ServiceModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}