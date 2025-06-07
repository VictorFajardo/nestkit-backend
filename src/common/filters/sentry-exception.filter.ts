import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Only report serious errors
    if (status >= 500 && process.env.SENTRY_DSN) {
      Sentry.captureException(exception, {
        extra: {
          path: req.path,
          method: req.method,
          user: req.user ?? null,
          body: req.body,
        },
      });
    }

    // Optional: you may also forward the exception to other filters
    res.status(status).json({
      statusCode: status,
      message:
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error',
    });
  }
}
