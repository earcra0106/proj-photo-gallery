import { registerAs } from '@nestjs/config';
import { ServerEnv, validateServerEnv } from '@/config/schema/server';
import { DatabaseEnv, validateDatabaseEnv } from '@/config/schema/database';

export const serverConfig = registerAs('server', (): ServerEnv => {
  return validateServerEnv(process.env);
});

export const databaseConfig = registerAs('database', (): DatabaseEnv => {
  return validateDatabaseEnv(process.env);
});
