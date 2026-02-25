import { registerAs } from '@nestjs/config';
import { ServerEnv, validateServerEnv } from './schema/server';
import { DatabaseEnv, validateDatabaseEnv } from './schema/database';

export const serverConfig = registerAs('server', (): ServerEnv => {
  return validateServerEnv(process.env);
});

export const databaseConfig = registerAs('database', (): DatabaseEnv => {
  return validateDatabaseEnv(process.env);
});
