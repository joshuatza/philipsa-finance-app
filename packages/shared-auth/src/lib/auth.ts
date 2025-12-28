import { betterAuth } from 'better-auth';
import { genericOAuth } from 'better-auth/plugins';
import { authPlugins, dbAdapter } from './auth-config.js';

const env = process.env;

export const auth: any = betterAuth({
	appName: 'PhilipSA Auth',
	baseURL: env.BETTER_AUTH_URL || env.NEXT_PUBLIC_APP_URL,
	emailAndPassword: { enabled: true },
	account: { accountLinking: { enabled: true } },
	database: dbAdapter,
	plugins: [
		...authPlugins,
		genericOAuth({
			config: [
				{
					providerId: 'logto',
					clientId: env.LOGTO_CLIENT_ID || '',
					clientSecret: env.LOGTO_CLIENT_SECRET || '',
					discoveryUrl: 'https://auth.lightrainair.co.za/oidc/.well-known/openid-configuration',
					scopes: ['openid', 'profile', 'email'],
				},
			],
		}),
	],
	socialProviders: {},
});

export default { auth };
