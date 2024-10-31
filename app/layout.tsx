import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@/app/globals.css";
import GlobalNavigation from "@/components/ncaaf/global-navigation";
import GlobalFooter from "@/components/ncaaf/global-footer";
import { fontMono, fontSans, fontSerif } from "@/lib/fonts";
import { siteConfig } from "@/config/siteConfig";
import TeamsList from "@/components/team/team-list";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}>
			<body className='font-sans antialiased min-h-screen'>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<GlobalNavigation />
					<main className='flex-1'>
						<div className='border-b'>
							<div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
								<aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
									<ScrollArea className='h-full py-6 pr-2 lg:py-8'>
										<div className='w-full pb-4'>
											<TeamsList logo_s={20} />
										</div>
									</ScrollArea>
								</aside>
								{children}
							</div>
						</div>
					</main>
					<GlobalFooter />
				</div>
				<Analytics />
			</body>
		</html>
	);
}
