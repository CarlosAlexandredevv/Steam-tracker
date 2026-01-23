import 'dotenv/config';
import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional().default('http://localhost:3000'),
  JWT_SECRET: z.string().optional(),
  DATABASE_URL: z.url().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  STEAM_API_KEY: z.string().optional(),
  APP_URL: z.url().optional(),
});

export const env = clientEnvSchema.parse(process.env);
