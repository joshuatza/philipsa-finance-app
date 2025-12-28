'use client';

import { LoginForm } from '@philipsa/shared-ui/components/forms/login-form';
import { useAuthLoginForm } from '../../../hooks/use-auth-form';

export default function LoginPage() {
	const { submit, loading, error } = useAuthLoginForm();

	return <LoginForm error={error} loading={loading} onSubmit={submit} />;
}
