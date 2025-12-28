import { GalleryVerticalEnd } from 'lucide-react';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import type React from 'react';

type AuthLayoutProps = {
	splashScreen: string | StaticImport;
	appLogo: string | StaticImport;
	appName: string;
	children: React.ReactNode;
};

export default function AuthLayout({ splashScreen, appLogo, appName, children }: AuthLayoutProps) {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="relative hidden bg-muted lg:block">
				{/* Splash Screen Image */}
				<Image alt="Splash Screen" className="object-cover" fill src={splashScreen} />

				{/* App Logo Overlay */}
				<div className="absolute inset-0 flex items-center justify-center">
					<Image alt="App Logo" className="z-10 drop-shadow-xl" height={200} src={appLogo} width={200} />
				</div>
			</div>

			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<a className="flex items-center gap-2 font-medium" href="/auth/login">
						<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GalleryVerticalEnd className="size-4" />
						</div>
						{appName}
					</a>
				</div>
				<div className="flex flex-1 flex-col items-center justify-center p-10">
					<div className="w-full">{children}</div>
				</div>
			</div>
		</div>
	);
}
