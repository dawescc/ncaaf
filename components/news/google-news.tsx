import { cn } from "@/lib/utils";
import Link from "next/link";
import Parser from "rss-parser";

const parser = new Parser();

interface Article {
	link: string;
	title: string;
	source: string;
}

async function fetchWithRevalidate(url: string) {
	try {
		const response = await fetch(url, {
			next: { revalidate: 1800 },
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		}); // Revalidate every hour
		if (!response.ok) throw new Error(`Failed to fetch ${url}`);
		return response.text();
	} catch (error) {
		console.error(`Error fetching ${url}:`, error);
		throw error;
	}
}

async function fetchNews({ keyword, limit }: { keyword: string; limit: number }) {
	const encodedKeyword = encodeURIComponent(keyword);
	const feedUrl = `https://news.google.com/rss/search?q=${encodedKeyword}&hl=en-US&gl=US&ceid=US:en`;

	try {
		const rawFeed = await fetchWithRevalidate(feedUrl);
		const feed = await parser.parseString(rawFeed);
		return feed.items.slice(0, limit).map((item) => {
			// Extract source from title
			const sourceMatch = item.title?.match(/- ([^-]+)$/);
			const source = sourceMatch ? sourceMatch[1].trim() : "Unknown Source";

			// Remove the source from the title
			const titleWithoutSource = item.title?.replace(/- [^-]+$/, "").trim();

			return {
				link: item.link,
				title: titleWithoutSource,
				source: source,
			};
		}) as Article[];
	} catch (error) {
		console.error("Error fetching or parsing news:", error);
		return null;
	}
}

export default async function GoogleNews({ keyword = "college-football", limit = 5 }: { keyword?: string; limit?: number }) {
	const articles = await fetchNews({ keyword, limit });

	if (!articles) return <div className='pb-4'>Error fetching news</div>;
	if (articles.length === 0) return <div className='pb-4'>No articles found</div>;

	return (
		<div className={cn("pb-4 flex flex-col gap-0.5")}>
			{articles.map((article: Article, index: number) => (
				<Link
					key={index}
					href={article.link}
					target='_blank'
					rel='noopener noreferrer'
					className='group w-full px-2 py-1.5 hover:underline text-muted-foreground'>
					<span className='font-bold inline'>{article.source}:</span> {article.title}
				</Link>
			))}
		</div>
	);
}
