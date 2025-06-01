import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppLogger } from '@common/logger/logger.service';
import { AppConfig } from '@config/app.config';
import { CorsConfig } from '@config/cors.config';
import { helmetOptions } from '@config/helmet.config';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from '@common/filters/http-exception.filter';
import { PrismaExceptionFilter } from '@common/filters/prisma-exception.filter';

async function bootstrap() {
  console.log('🚀 DB URL:', process.env.DATABASE_URL);
  console.log('🚀 Effective PORT:', process.env.PORT);
  const appLogger = new AppLogger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: appLogger,
  });

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new PrismaExceptionFilter(),
  );

  app.use(helmet(helmetOptions));
  app.enableCors(CorsConfig);
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.enableShutdownHooks();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(AppConfig.port);
  console.log(`🚀 App listening on port ${AppConfig.port}`);
}
void bootstrap();
