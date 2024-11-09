export const siteConfig = {
	name: "NCAAF",
	url: "https://ncaaf.dawes.cc",
	ogImage: "/og.png",
	description: "NCAAF by Dawes.",
	links: {
		twitter: "https://twitter.com/dawescc",
		github: "https://github.com/dawescc",
		website: "https://dawes.cc",
	},
	pages: [
		{ title: "Home", href: "/" },
		{ title: "Scores", href: "/scores" },
		{ title: "News", href: "/news" },
		{ title: "Teams", href: "/teams" },
		{ title: "Conferences", href: "/conferences" },
	],
};

export type SiteConfig = typeof siteConfig;
