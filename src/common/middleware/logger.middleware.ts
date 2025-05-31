import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = uuidv4();
    const start = Date.now();

    req.headers['x-request-id'] = requestId;

    res.on('finish', () => {
      const duration = Date.now() - start;

      this.logger.log(
        'info',
        `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms [request-id: ${requestId}]`,
      );
    });

    next();
  }
}
