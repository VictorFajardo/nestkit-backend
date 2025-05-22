import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from '@common/decorators/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app
    .useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector))
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // strips unknown props
        forbidNonWhitelisted: true, // throws on unknown props
        transform: true, // auto-transform types
      }),
    );

  await app.listen(3000);
}
bootstrap();
