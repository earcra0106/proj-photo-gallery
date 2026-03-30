import { z } from 'zod';

const databaseEnvSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  host: z.string().nonempty(),
  port: z.coerce.number().int().positive(),
  dbname: z.string().nonempty(),
});

export type DatabaseEnv = z.infer<typeof databaseEnvSchema>;

export function validateDatabaseEnv(
  config: Record<string, unknown>,
): DatabaseEnv {
  try {
    return databaseEnvSchema.parse({
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      host: config.DATABASE_HOST,
      port: config.DATABASE_PORT,
      dbname: config.DATABASE_NAME,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('環境変数のバリデーションエラー:', error.message);
    }
    throw error;
  }
}
