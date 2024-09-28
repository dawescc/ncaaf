import Top25 from "@/components/apRankings";
import ConferenceList from "@/components/confList";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import WeekGames from "@/components/weeksGames";

export default async function Home() {
	return (
		<Container>
			<div className='flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-10'>
				<Card className='pt-4 h-fit'>
					<CardContent>
						<WeekGames />
					</CardContent>
				</Card>
				<Card className='pt-4 h-fit'>
					<CardContent>
						<Top25 />
					</CardContent>
				</Card>
				<Card className='pt-4 h-fit'>
					<CardContent>
						<ConferenceList />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
