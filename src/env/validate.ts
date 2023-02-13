import { envSchema } from './schema';

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
