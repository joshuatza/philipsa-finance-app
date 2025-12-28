import '@dotenvx/dotenvx/config';
import { env } from 'node:process';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/schema/auth-schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: env.DATABASE_URL || '',
	},
});
