import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = req.headers['x-request-id'] || uuidv4();

    // Attach it to the request object
    req['requestId'] = requestId;

    // Make it accessible in response and logs
    res.setHeader('X-Request-Id', requestId);
    res.locals.requestId = requestId;

    next();
  }
}
