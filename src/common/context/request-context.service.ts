import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

type RequestContextData = {
  requestId?: string;
  userId?: string;
  path?: string;
  method?: string;
};

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContextData>();

  run<T>(data: RequestContextData, callback: (...args: any[]) => T): T {
    return this.storage.run(data, callback);
  }

  get<T extends keyof RequestContextData>(
    key: T,
  ): RequestContextData[T] | undefined {
    return this.storage.getStore()?.[key];
  }

  getAll(): RequestContextData | undefined {
    return this.storage.getStore();
  }
}
