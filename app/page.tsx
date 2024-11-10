import GroupLeaders from "@/components/conference/conference-leaders";
import ConferenceList from "@/components/conference/conference-list";
import GoogleNews from "@/components/news/google-news";
import Top25 from "@/components/rankings/top-25";
import Scoreboard from "@/components/scoreboard/score-board";
import { PageContent, PageDescription, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";
import Link from "next/link";

export default function Home() {
	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle className='font-serif'>Top 25</PageTitle>
					<PageDescription>The current Top 25.</PageDescription>
				</PageHeader>

				<Top25 />
				<PageHeader className='mt-8'>
					<PageTitle className='font-serif'>Top 25 Scoreboard</PageTitle>
					<PageDescription>
						Scores for Top 25 Teams.{" "}
						<Link
							className='link'
							href={"/scores"}>
							See all scores
						</Link>
						.
					</PageDescription>
				</PageHeader>
				<Scoreboard />
				<PageHeader className='mt-8'>
					<PageTitle className='font-serif'>Top 10 Statistics</PageTitle>
					<PageDescription>Top 10 Statistical Leaders of all FBA I-A Teams and Players.</PageDescription>
				</PageHeader>
				<GroupLeaders group={80} />
			</PageContent>
			<PageSide
				group={80}
				limit={5}>
				<p className='font-medium'>News</p>
				<GoogleNews keyword={"college-football"} />

				<p className='font-medium'>Conferences</p>
				<ConferenceList />
			</PageSide>
		</PageWrapper>
	);
}
