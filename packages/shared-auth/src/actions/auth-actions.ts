import type { authClient } from '../lib/auth-client';
import { loginSchema } from '../schema/forms-schema';
import type { AuthInput, AuthResponse } from '../types';

export function createAuthAction(authClientInstance: typeof authClient) {
	return async function authAction(payload: AuthInput): Promise<AuthResponse> {
		const result = loginSchema.safeParse(payload);

		if (!result.success) {
			return {
				success: false,
				error: result.error.errors[0]?.message || 'Invalid Input',
			};
		}

		const data = result.data;

		try {
			const res = await authClientInstance.signIn.username({
				username: data.scj_id.replace(/-/g, ''),
				password: data.password,
			});

			if (res.error) {
				return {
					success: false,
					error: res.error.message || 'Authentication failed',
				};
			}

			return {
				success: true,
				user: res.data?.user || null,
			};
		} catch (_e) {
			return {
				success: false,
				error: 'Something went wrong. Try again later.',
			};
		}
	};
}
