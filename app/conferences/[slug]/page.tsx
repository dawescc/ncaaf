import Link from "next/link";
import Image from "next/image";
import { conferences } from "@/data/teams";
import ConfStandings from "@/components/confStandings";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

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
		<Container>
			<span className='mb-4 flex items-center gap-2 md:gap-4'>
				<Image
					src={conference.href}
					alt={`${conference.full} logo`}
					width={50}
					height={50}
					className='size-16 md:size-20'
				/>
				<div className='flex flex-col justify-evenly'>
					<h1 className='font-bold text-2xl md:text-3xl font-serif'>{conference.full}</h1>
					<span className='font-medium text-slate-400 md:text-xl'>{conference.short}</span>
				</div>
			</span>
			<div className='flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-10'>
				<Card className='pt-4 h-fit'>
					<CardContent>
						<ConfStandings conf_id={conference.id} />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
