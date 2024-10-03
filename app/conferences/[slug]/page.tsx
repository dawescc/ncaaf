import Link from "next/link";
import Image from "next/image";
import { conferences } from "@/data/conferences";
import { PageContent, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";

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
					<PageTitle>
						<Image
							src={conference.href}
							alt={`${conference.full} logo`}
							width={50}
							height={50}
							className='size-16 md:size-20'
						/>
						<h1 className='font-bold text-2xl md:text-3xl font-serif'>{conference.full}</h1>
						<span className='font-medium text-slate-400 md:text-xl'>{conference.short}</span>
					</PageTitle>
				</PageHeader>
				hi
			</PageContent>
			<PageSide group={conference.id}></PageSide>
		</PageWrapper>
	);
}
