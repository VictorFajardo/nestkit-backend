import { writeFileSync } from 'fs';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { resolve } from 'path';

async function generateSwaggerJson() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestKit API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outputPath = resolve(__dirname, '../docs/swagger.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  await app.close();
}
generateSwaggerJson();
