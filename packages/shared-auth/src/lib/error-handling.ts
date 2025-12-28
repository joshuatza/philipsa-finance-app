import type { APIError } from 'better-auth';

export function parseAPIError(error: unknown): string {
	const e = error as APIError;
	if (!e || typeof e !== 'object') {
		return 'Unknown error';
	}
	return `${e.status ?? 'Error'}: ${e.message ?? 'Something went wrong'}`;
}
