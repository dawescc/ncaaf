import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { GlobalNavigation } from "@/components/ncaaf/globalNavigation";
import GlobalFooter from "@/components/ncaaf/globalFooter";
import { jetMono, notoSans, notoSerif } from "@/lib/fonts";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: ["ncaaf", "cfb", "college football"],
	authors: [
		{
			name: "dawescc",
			url: siteConfig.links.website,
		},
	],
	creator: "dawescc",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@dawescc",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.variable} ${notoSerif.variable} ${jetMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
				<GlobalNavigation />
				<main className='w-full'>{children}</main>
				<GlobalFooter />
			</body>
		</html>
	);
}
