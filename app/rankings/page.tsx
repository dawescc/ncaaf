import Top25 from "@/components/rankings/top-25";
import { PageContent, PageDescription, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";

export default async function Page() {
	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle>Top 25</PageTitle>
					<PageDescription>AP Top 25</PageDescription>
				</PageHeader>
				<Top25 />
			</PageContent>
			<PageSide group={80}></PageSide>
		</PageWrapper>
	);
}
