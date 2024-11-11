import GoogleNews from "@/components/news/google-news";
import TeamBanner from "@/components/team/team-banner";
import TeamSchedule from "@/components/team/team-schedule";
import TeamStatLeaders from "@/components/team/team-stat-leaders";
import TeamStats from "@/components/team/team-stats";
import { PageContent, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";
import { teams } from "@/data/teams";
import { getTeam } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
	const team = getTeam(params.slug);

	if (!team) {
		notFound();
	}

	return (
		<PageWrapper>
			<PageContent>
				<TeamBanner teamId={team.id} />
				<PageHeader className='mt-8'>
					<PageTitle className='font-serif'>Schedule</PageTitle>
				</PageHeader>
				<TeamSchedule team={team.id} />
				<PageHeader className='mt-8'>
					<PageTitle className='font-serif'>Team Leaders</PageTitle>
				</PageHeader>
				<TeamStatLeaders team={team.id} />
				<PageHeader className='mt-8'>
					<PageTitle className='font-serif'>Team Statistics</PageTitle>
				</PageHeader>
				<TeamStats team={team.id} />
			</PageContent>
			<PageSide team={team.id}>
				<p className='font-medium'>News</p>
				<GoogleNews keyword={team.slug} />
			</PageSide>
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
		title: team.displayName,
		alternates: {
			canonical: `/teams/${team.displayName}`,
		},
	};
}
