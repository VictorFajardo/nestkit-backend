import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from '@common/decorators/guards/roles.guard';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Ensure AppConfig.port is defined and valid
  await app.listen(AppConfig.port || 3000);
}
void bootstrap();
