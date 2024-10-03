import ConferenceList from "@/components/conference/conference-list";
import GoogleNews from "@/components/google-news";
import Top25 from "@/components/rankings/top-25";
import { PageContent, PageDescription, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";

export default async function Home() {
	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle className='font-serif'>Top 25</PageTitle>
					<PageDescription>AP Top 25</PageDescription>
				</PageHeader>
				<Top25 />
			</PageContent>
			<PageSide
				group={80}
				limit={5}>
				<p className='font-medium'>News</p>
				<GoogleNews keyword={"ncaaf-college-football"} />

				<p className='font-medium'>Conferences</p>
				<ConferenceList />
			</PageSide>
		</PageWrapper>
	);
}
