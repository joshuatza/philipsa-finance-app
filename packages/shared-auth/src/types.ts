export interface AuthInput {
	username?: string;
	password: string;
}

export interface AuthResponse {
	success: boolean;
	user?: { id: string; name?: string; email?: string };
	error?: string;
}
