import ConfStandings from "@/components/conference/conference-standings";
import TeamBanner from "@/components/team/team-banner";
import TeamLeaders from "@/components/team/team-leaders";
import TeamStats from "@/components/team/team-stats";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { teams } from "@/data/conferences-teams";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
	const slugOrId = params.slug;
	const team = Object.values(teams).find((team) => team.slug === slugOrId);

	if (!team) {
		notFound();
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const slugOrId = params.slug;
	const team = Object.values(teams).find((team) => team.slug === slugOrId || team.id === slugOrId);

	if (!team) {
		return {
			title: "Team Not Found",
		};
	}

	return {
		title: team.slug,
		alternates: {
			canonical: `/teams/${team.slug}`,
		},
	};
}
