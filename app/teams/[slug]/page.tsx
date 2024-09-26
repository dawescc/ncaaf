import ConfStandings from "@/components/confStandings";
import TeamBanner from "@/components/teamBanner";
import TeamLeaders from "@/components/teamLeaders";
import TeamSchedule from "@/components/teamSchedule";
import TeamStats from "@/components/teamStats";
import { Card, CardContent } from "@/components/ui/card";
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
			<div className='flex flex-col md:flex-row md:flex-wrap gap-4 py-10'>
				<Card className='pt-4 h-fit flex-1'>
					<CardContent>
						<ConfStandings conf_id={team.conference} />
					</CardContent>
				</Card>
				<Card className='pt-4 h-fit flex-1'>
					<CardContent>
						<TeamLeaders teamId={parseInt(team.id)} />
					</CardContent>
				</Card>
				<Card className='pt-4 h-fit flex-1'>
					<CardContent>
						<TeamSchedule teamId={parseInt(team.id)} />
					</CardContent>
				</Card>
				<Card className='pt-4 h-fit flex-1'>
					<CardContent>
						<TeamStats teamId={parseInt(team.id)} />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
