import Link from "next/link";
import Image from "next/image";
import { conferences } from "@/data/conferences";
import { PageContent, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";
import GoogleNews from "@/components/news/google-news";
import Scoreboard from "@/components/scoreboard/score-board";
import GroupLeaders from "@/components/conference/conference-leaders";

export default async function ConferencePage({ params }: { params: { slug: string } }) {
	const confSlug = params.slug;
	const conference = conferences[confSlug];

	if (!conference) {
		return (
			<div className='px-10 py-20 flex flex-col space-y-4'>
				<h1 className='font-bold text-3xl font-serif'>Conference not found.</h1>
				<Link
					href='/'
					className='hover:underline'>
					Go home
				</Link>
			</div>
		);
	}

	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle className='font-serif'>
						<Image
							src={conference.href}
							alt={`${conference.full} logo`}
							width={50}
							height={50}
							className='size-16 md:size-20'
						/>
						{conference.full}
					</PageTitle>
				</PageHeader>
				<PageHeader className='mt-8'>
					<PageTitle className='font-serif'>Scoreboard</PageTitle>
				</PageHeader>
				<Scoreboard groups={conference.id} />
				<PageHeader className='mt-8'>
					<PageTitle className='font-serif'>Statistical Leaders</PageTitle>
				</PageHeader>
				<GroupLeaders group={conference.id} />
			</PageContent>
			<PageSide group={conference.id}>
				<p className='font-medium'>News</p>
				<GoogleNews keyword={conference.full} />
			</PageSide>
		</PageWrapper>
	);
}
