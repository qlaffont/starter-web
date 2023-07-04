import 'dotenv/config';

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_GQL_URL: z.string().url(),
    NEXT_PUBLIC_DEV: z.string().transform((s) => s !== 'false' && s !== '0'),
  },
  server: {
    NODE_ENV: z.string().default('development'),
    LOG: z.enum(['info', 'debug', 'error', 'silent', 'warning']).default('info'),
    PORT: z
      .string()
      .default('3100')
      .transform((s) => parseInt(s)),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GQL_URL: process.env.NEXT_PUBLIC_GQL_URL,
    NEXT_PUBLIC_DEV: process.env.NEXT_PUBLIC_DEV,

    NODE_ENV: process.env.NODE_ENV,
    LOG: process.env.LOG,
    PORT: process.env.PORT,
  },
});
