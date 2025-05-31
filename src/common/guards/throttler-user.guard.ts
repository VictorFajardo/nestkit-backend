import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerUserGuard extends ThrottlerGuard {
  protected async getTracker(context: ExecutionContext): Promise<string> {
    const req = context.switchToHttp().getRequest();
    return req.user?.id ?? req.ip; // fallback to IP if user not logged in
  }
}
