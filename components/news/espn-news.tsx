import Link from "next/link";
import { cn } from "@/lib/utils";

type NewsItem = {
	headline: string;
	description: string;
	published: string;
	links: {
		web: {
			href: string;
		};
	};
	images?: {
		url: string;
		caption: string;
	}[];
};

type ResProps = {
	articles: NewsItem[];
	header: string;
};

type Props = {
	groupId?: number | 80;
	teamId?: number;
	limit?: number | 5;
};

async function fetchWithRevalidate(url: string) {
	try {
		const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
		if (!response.ok) throw new Error(`Failed to fetch ${url}`);
		return response.json();
	} catch (error) {
		console.error(`Error fetching ${url}:`, error);
		throw error;
	}
}

async function fetchNews({ groupId = 80, teamId, limit = 5 }: Props): Promise<ResProps> {
	const params = new URLSearchParams();
	params.append("group", groupId.toString());

	if (teamId !== undefined) {
		params.append("team", teamId.toString());
	}

	params.append("limit", limit.toString());

	const url = `http://site.api.espn.com/apis/site/v2/sports/football/college-football/news?${params.toString()}`;
	return fetchWithRevalidate(url);
}

const EspnNews = async ({ groupId, teamId, limit }: Props) => {
	try {
		const { articles } = await fetchNews({ groupId, teamId, limit });

		if (!articles) return <div className='pb-4'>Error fetching news</div>;
		if (articles.length === 0) return <div className='pb-4'>No articles found</div>;

		return (
			<div className={cn("pb-4 flex flex-col gap-0.5")}>
				{articles.map((article, index) => (
					<Link
						key={index}
						href={article.links.web.href}
						target='_blank'
						rel='noopener noreferrer'
						className='group px-2 py-1.5 hover:underline text-muted-foreground'>
						<span className='font-bold inline'>ESPN:</span> {article.headline}
					</Link>
				))}
			</div>
		);
	} catch (error) {
		console.error("Failed to fetch news:", error);
		return <div className='pb-4'>Failed to load news. Please try again later.</div>;
	}
};

export default EspnNews;
