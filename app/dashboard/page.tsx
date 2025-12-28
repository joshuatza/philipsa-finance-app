import { auth } from '@philipsa/shared-auth/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect('/auth/login');
	}

	return (
		<div>
			<h1>Welcome {session.user.name}</h1>
		</div>
	);
}
