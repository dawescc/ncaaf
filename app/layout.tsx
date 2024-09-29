import type { Metadata } from "next";

import "./globals.css";
import { GlobalNavigation } from "@/components/globalNavigation";
import GlobalFooter from "@/components/globalFooter";
import { notoSans, notoSerif } from "./fonts";

export const metadata: Metadata = {
	title: "NCAAF",
	description: "NCAAF by Dawes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased flex flex-col min-h-screen`}>
				<GlobalNavigation />
				<main className='w-full'>{children}</main>
				<GlobalFooter />
			</body>
		</html>
	);
}
