import { z } from 'zod';

const envSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  DATABASE_URL: z.string().url(),
  PORT: z.string().optional(),
});

export const validatedEnv = envSchema.parse(process.env);
