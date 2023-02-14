import { envSchema } from './schema';
import { config } from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.NODE_ENV === 'development' &&
  config({
    path: path.resolve(__dirname, '../../../.env'),
  });

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    env.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')
  );

  throw new Error('Invalid environment variables');
}

export const parsedEnv = env.data;
