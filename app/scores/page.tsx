import ConferenceList from "@/components/conference/conference-list";
import GoogleNews from "@/components/google-news";
import Scoreboard from "@/components/score-board";
import { PageContent, PageDescription, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";

export default async function Home() {
	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle className='font-serif'>Scoreboard</PageTitle>
					<PageDescription>Division I-A Scores</PageDescription>
				</PageHeader>
				<Scoreboard />
			</PageContent>
			<PageSide noNews>
				<p className='font-medium'>News</p>
				<GoogleNews
					limit={5}
					keyword={"ncaaf-college-football"}
				/>

				<p className='font-medium'>Conferences</p>
				<ConferenceList />
			</PageSide>
		</PageWrapper>
	);
}
