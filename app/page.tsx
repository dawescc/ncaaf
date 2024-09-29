import Top25 from "@/components/apRankings";
import ConferenceList from "@/components/confList";
import Scoreboard from "@/components/scoreBoard";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default async function Home() {
	return (
		<Container>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				<div className='pt-4 h-fit'>
					<Scoreboard />
				</div>
				<div className='pt-4 h-fit'>
					<Top25 />
				</div>
				<Card className='pt-4 h-fit'>
					<CardContent>
						<ConferenceList />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
