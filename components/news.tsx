import Link from "next/link";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";

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
	groupId: number;
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

async function fetchNews(groupId: number): Promise<ResProps> {
	const url = `http://site.api.espn.com/apis/site/v2/sports/football/college-football/news?group=${groupId}`;
	return fetchWithRevalidate(url);
}

const News = async ({ groupId }: Props) => {
	try {
		const { articles, header } = await fetchNews(groupId);

		return (
			<Table className='font-mono'>
				<TableCaption className='font-sans'>{header}</TableCaption>
				<TableBody>
					{articles.map((article, index) => (
						<TableRow key={index}>
							<TableCell className='align-top'>
								<Link
									href={article.links.web.href}
									className='hover:underline'>
									<h3 className='font-bold mb-2'>{article.headline}</h3>
									{article.images && article.images[0] && (
										<Image
											src={article.images[0].url}
											alt={article.images[0].caption || article.headline}
											width={300}
											height={169}
											className='rounded-md w-full h-auto'
										/>
									)}
								</Link>
								<p className='text-sm text-gray-600 mt-1'>{article.description}</p>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	} catch (error) {
		console.error("Failed to fetch news:", error);
		return <div>Failed to load news. Please try again later.</div>;
	}
};

export default News;
