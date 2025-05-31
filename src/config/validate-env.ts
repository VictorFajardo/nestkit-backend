import { z } from 'zod';

const envSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  DATABASE_URL: z.string().url(),
  PORT: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'PORT must be a valid number',
    }),
});

console.log(
  'PORT typeof:',
  typeof process.env.PORT,
  '| value:',
  process.env.PORT,
);

export const validatedEnv: Record<string, string | number> = envSchema.parse(
  process.env,
);
