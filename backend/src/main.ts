import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalCatchHandler } from './common/helpers/globalCatchHandler';
import { ResponseInterceptor } from './common/interceptors/responseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalCatchHandler());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('PITSTOP APIS')
    .setDescription('PITSOP API description')
    .setVersion('1.0')
    .addTag('APIS')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
