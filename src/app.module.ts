import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AiModule } from './ai/ai.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from '@common/middleware/logger.middleware';
import { LoggerModule } from 'logger/logger.module';
import { PrismaService } from '@prisma/prisma.service';
import { THROTTLER_CONFIG, throttlerConfig } from '@config/throttler.config';
import { ThrottlerUserGuard } from '@common/guards/throttler-user.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AiModule,
    LoggerModule,
    ThrottlerModule.forRoot(throttlerConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: THROTTLER_CONFIG,
      useValue: throttlerConfig,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerUserGuard,
    },
  ],
})
export class AppModule implements NestModule, OnApplicationShutdown {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  onApplicationShutdown(signal: string) {
    console.log(`Application shutting down due to: ${signal}`);
  }
}
