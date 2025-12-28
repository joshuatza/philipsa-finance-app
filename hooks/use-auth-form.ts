'use client';

import { createAuthAction } from '@philipsa/shared-auth/actions/auth-actions';
import { authClient } from '@philipsa/shared-auth/lib/auth-client';
import type { AuthInput } from '@philipsa/shared-auth/types';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const authAction = createAuthAction(authClient);

export function useAuthLoginForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function submit(payload: AuthInput) {
		setLoading(true);
		setError(null);

		const res = await authAction(payload);

		setLoading(false);

		if (res.success) {
			redirect('/dashboard');
		} else {
			setError(res.error || 'Authentication failed.');
		}
	}

	return { submit, loading, error };
}
