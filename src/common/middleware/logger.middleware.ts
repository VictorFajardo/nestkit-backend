import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '@app/common/metrics/metrics.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - start;

      // Log HTTP request info
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
      );

      // Increment metrics counter
      this.metricsService.increment(method, originalUrl, statusCode.toString());
    });

    next();
  }
}
