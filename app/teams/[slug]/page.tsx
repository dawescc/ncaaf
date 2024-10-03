import Top25 from "@/components/rankings/top-25";
import TeamBanner from "@/components/team/team-banner";
import { PageContent, PageHeader, PageSide, PageWrapper } from "@/components/ui/page-wrapper";
import { teams } from "@/data/teams";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
	const team = Object.values(teams).find((team) => team.slug === params.slug);

	if (!team) {
		notFound();
	}

	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<TeamBanner teamId={parseInt(team.id)} />
				</PageHeader>
				<Top25 />
			</PageContent>
			<PageSide group={parseInt(team.conference)}></PageSide>
		</PageWrapper>
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
