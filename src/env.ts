import 'dotenv/config';
import { z } from 'zod';

const clientEnvSchema = z.object({
  JWT_SECRET: z.string().optional(),
  DATABASE_URL: z.url().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  STEAM_API_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.url().optional(),
});

export const env = clientEnvSchema.parse(process.env);
