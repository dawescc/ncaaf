import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import GlobalNavigation from "@/components/globalNavigation";
import GlobalFooter from "@/components/globalFooter";

export const metadata: Metadata = {
	title: "NCAAF",
	description: "NCAAF by Dawes",
};

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className} antialiased`}>
				<GlobalNavigation />
				{children}
				<GlobalFooter />
			</body>
		</html>
	);
}
