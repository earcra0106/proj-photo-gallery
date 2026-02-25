import { z } from 'zod';

/**
 * 環境変数のバリデーションスキーマ
 */
const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DATABASE_USERNAME: z.string().nonempty(),
  DATABASE_PASSWORD: z.string().nonempty(),
  DATABASE_HOST: z.string().nonempty(),
  DATABASE_PORT: z.coerce.number().int().positive(),
  DATABASE_NAME: z.string().nonempty(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('環境変数のバリデーションエラー:', error.message);
    }
    throw error;
  }
}
