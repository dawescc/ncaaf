import ConferenceList from "@/components/conference/conference-list";
import EspnNews from "@/components/news/espn-news";
import GoogleNews from "@/components/news/google-news";
import { PageContent, PageDescription, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";

export default async function TeamsPage() {
	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle>News</PageTitle>
					<PageDescription>FBSI-A News</PageDescription>
					<p className='font-medium'>Misc. Sources</p>
					<GoogleNews limit={35} />
					<p className='font-medium'>ESPN</p>
					<EspnNews limit={20} />
				</PageHeader>
			</PageContent>
			<PageSide noNews>
				<p className='font-medium'>Conferences</p>
				<ConferenceList />
			</PageSide>
		</PageWrapper>
	);
}
