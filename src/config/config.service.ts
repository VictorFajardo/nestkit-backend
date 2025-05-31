import { EnvKey } from '@common/constants/env-keys.enum';
import { validatedEnv } from './validate-env';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor() {}

  get<T = string>(key: EnvKey): T {
    const value = validatedEnv[key];
    if (value === undefined || value === null) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value as T;
  }

  getOptional<T = string>(key: EnvKey): T | undefined {
    return validatedEnv[key] as T | undefined;
  }

  // Common configuration getters
  get jwtSecret(): string {
    return this.get(EnvKey.JWT_SECRET);
  }

  get jwtExpiresIn(): string {
    return this.get(EnvKey.JWT_EXPIRES_IN);
  }

  get jwtRefreshSecret(): string {
    return this.get(EnvKey.JWT_REFRESH_SECRET);
  }

  get jwtRefreshExpiresIn(): string {
    return this.get(EnvKey.JWT_REFRESH_EXPIRES_IN);
  }

  get port(): number {
    return this.get<number>(EnvKey.PORT);
  }

  get databaseUrl(): string {
    return this.get(EnvKey.DATABASE_URL);
  }
}
