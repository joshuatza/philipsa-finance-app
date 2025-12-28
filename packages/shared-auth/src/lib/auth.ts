import { betterAuth } from 'better-auth';
import { authPlugins, dbAdapter } from './auth-config.js';

export const auth: any = betterAuth({
	appName: 'PhilipSA Auth',
	emailAndPassword: { enabled: true },
	account: { accountLinking: { enabled: true } },
	database: dbAdapter,
	plugins: authPlugins,
});

export default { auth };
