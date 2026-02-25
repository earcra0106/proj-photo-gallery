import { registerAs } from '@nestjs/config';
import { validateEnv } from '../../env.validation';
import type { Env } from '../../env.validation';

export const configuration = registerAs('app', (): Env => {
  return validateEnv(process.env);
});

export type AppConfig = Env;
