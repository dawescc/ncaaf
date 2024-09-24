import ConfStandings from "@/components/confStandings";
import TeamBanner from "@/components/teamBanner";
import TeamStats from "@/components/teamStats";
import { Container } from "@/components/ui/container";
import { teams } from "@/data/teams";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
	const teamSlug = params.slug;
	const team = Object.values(teams).find((team) => team.slug === teamSlug);
	if (!team) {
		return (
			<Container>
				<h1 className='font-bold text-3xl font-serif'>Team not found.</h1>
				<Link
					href='/'
					className='hover:underline'>
					Go home
				</Link>
			</Container>
		);
	}

	return (
		<Container>
			<TeamBanner teamId={parseInt(team.id)} />
			<div className='flex-grow flex flex-col md:flex-row flex-wrap gap-4'>
				<div className='flex flex-col gap-2'>
					<h2 className='font-bold text-2xl font-serif'>Conference Standings</h2>
					<ConfStandings conf_id={team.conference} />
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='font-bold text-2xl font-serif'>Statistics</h2>
					<TeamStats teamId={parseInt(team.id)} />
				</div>
			</div>
		</Container>
	);
}
