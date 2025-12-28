'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@philipsa/shared-auth/schema/forms-schema';
import type { AuthInput } from '@philipsa/shared-auth/types';
import { LogIn, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { IconInput } from '../ui/inputs/icon-input';
import { PasswordInput } from '../ui/inputs/password-input';

interface LoginPageProps {
	onSubmit: (values: AuthInput) => void;
	loading: boolean;
	error?: string | null;
}

export function LoginForm({ onSubmit, loading, error }: LoginPageProps) {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			scj_id: '',
			password: '',
		},
	});

	const userIcon = <User aria-hidden="true" size={16} />;

	const handleLogtoLogin = () => {
		window.location.href = '/api/auth/signin/logto';
	};

	return (
		<div>
			<Form {...form}>
				<form className="mx-auto flex w-full flex-col space-y-6 p-2 md:p-5" onSubmit={form.handleSubmit(onSubmit)}>
					<h1 className="mb-10 font-bold text-3xl text-gray-900">Welcome</h1>
					
					{/* Logto SSO Button */}
					<Button
						type="button"
						variant="outline"
						className="w-full rounded-lg py-6 font-bold text-lg border-2 hover:bg-primary hover:text-primary-foreground"
						onClick={handleLogtoLogin}
					>
						<LogIn className="mr-2 h-5 w-5" />
						Login with SSO
					</Button>

					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">Or continue with credentials</span>
						</div>
					</div>

					<FormField
						control={form.control}
						name="scj_id"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<IconInput className="rounded-lg py-6" icon={userIcon} label="SCJ ID" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<PasswordInput className="py-6" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex w-full items-center justify-start pt-3">
						{error && <div className="text-red-600">{error}</div>}
						<Button
							className="rounded-lg bg-primary px-8 py-6 font-bold font-lg"
							disabled={loading}
							type="submit"
							variant="default"
						>
							{loading ? 'Logging in...' : 'Login'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
