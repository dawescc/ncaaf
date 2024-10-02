import TeamBanner from "@/components/team/team-banner";
import { Container } from "@/components/ui/container";
import { teams } from "@/data/teams";
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
			<div className='flex flex-col md:flex-row md:flex-wrap gap-4 py-10'></div>
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
