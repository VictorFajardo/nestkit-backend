// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppLogger } from '@common/logger/logger.service';
import { AppConfig } from '@config/app.config';
import { CorsConfig } from '@config/cors.config';
import { helmetOptions } from '@config/helmet.config';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from '@common/filters/http-exception.filter';
import { PrismaExceptionFilter } from '@common/filters/prisma-exception.filter';
import { RolesGuard } from '@common/decorators/guards/roles.guard';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

async function bootstrap() {
  console.log('🚀 DB URL:', process.env.DATABASE_URL);
  console.log('🚀 Effective PORT:', process.env.PORT);

  const appLogger = new AppLogger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: appLogger,
  });
  const logger = new Logger('HTTP');
  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => logger.log(message.trim()),
      },
    }),
  );
  const reflector = app.get(Reflector);
  const config = new DocumentBuilder()
    .setTitle('NestKit API')
    .setDescription(
      'Production-ready NestJS boilerplate with authentication, RBAC, auditing, and metrics.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
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
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet(helmetOptions));
    app.use(helmet.hidePoweredBy());
    app.enableCors(CorsConfig);
  } else {
    app.use(helmet());
    app.enableCors();
  }

  await app.listen(AppConfig.port);
  console.log(`🚀 App listening on port ${AppConfig.port}`);
}
void bootstrap();
