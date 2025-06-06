import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestContextService } from '../context/request-context.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  constructor(private readonly context: RequestContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const requestId = req.headers['x-request-id']?.toString() || uuidv4();
    const userId = req.user?.id?.toString(); // now should be defined

    const contextData = {
      requestId,
      userId,
      path: req.path,
      method: req.method,
    };

    return this.context.run(contextData, () => next.handle());
  }
}
