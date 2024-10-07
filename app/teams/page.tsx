import TeamsList from "@/components/team/team-list";
import { PageContent, PageDescription, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";

export default async function TeamsPage() {
	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle>Teams</PageTitle>
					<PageDescription>FBSI-A Teams</PageDescription>
				</PageHeader>
				<TeamsList />
			</PageContent>
			<PageSide group={80}></PageSide>
		</PageWrapper>
	);
}
