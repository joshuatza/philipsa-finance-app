import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import AuthLayout from './auth-layout';

type SplashProps = {
	splashScreen: string | StaticImport;
	appLogo: string | StaticImport;
	appName: string;
};

const splashPage = ({ splashScreen, appLogo, appName }: SplashProps) => {
	return (
		<AuthLayout appLogo={appLogo} appName={appName} splashScreen={splashScreen}>
			<section className="flex flex-col items-center justify-center gap-6 text-center">
				<h1 className="font-bold text-3xl">Welcome to Shincheonji {appName} Application</h1>
				<p className="text-2xl text-muted-foreground">Here is your colour palette:</p>

				{/* Color grid */}
				<div className="mt-4 grid grid-cols-2 gap-4">
					<div className="rounded-xl bg-primary p-6 text-primary-foreground shadow">Primary</div>
					<div className="rounded-xl bg-secondary p-6 text-secondary-foreground shadow">Secondary</div>
					<div className="rounded-xl bg-accent p-6 text-accent-foreground shadow">Accent</div>
					<div className="rounded-xl bg-destructive p-6 text-destructive-foreground shadow">Destructive</div>
				</div>
			</section>
		</AuthLayout>
	);
};

export default splashPage;
