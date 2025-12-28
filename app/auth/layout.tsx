import AuthLayout from '@philipsa/shared-ui/components/pages/shared/auth-layout';
import type React from 'react';
import logo from '../../public/logo.svg';
import splash from '../../public/splash.svg';

export default function AppAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthLayout appLogo={logo} appName="FINANCE" splashScreen={splash}>
			{children}
		</AuthLayout>
	);
}
