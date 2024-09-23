import Link from "next/link";
import Image from "next/image";
import { conferences } from "@/data/teams";
import ConfStandings from "@/components/confStandings";

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
		<div className='flex flex-col space-y-3 max-w-xl mx-auto'>
			<span className='mb-4 flex flex-wrap gap-2'>
				<Image
					src={conference.href}
					alt={`${conference.full} logo`}
					width={50}
					height={50}
					className='size-20'
				/>
				<h1 className='font-bold text-3xl font-serif'>{conference.full} Standings</h1>
			</span>
			<ConfStandings conf_id={conference.id} />
		</div>
	);
}
