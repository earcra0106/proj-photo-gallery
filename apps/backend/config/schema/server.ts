import { z } from 'zod';

const serverEnvSchema = z.object({
  port: z.coerce.number().int().positive(),
  nodeEnv: z.enum(['development', 'production', 'test']),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function validateServerEnv(config: Record<string, unknown>): ServerEnv {
  try {
    return serverEnvSchema.parse({
      port: config.PORT,
      nodeEnv: config.NODE_ENV,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('環境変数のバリデーションエラー:', error.message);
    }
    throw error;
  }
}
