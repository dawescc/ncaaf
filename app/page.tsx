import Top25 from "@/components/apRankings";
import ConferenceList from "@/components/confList";
import Scoreboard from "@/components/scoreBoard";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default async function Home() {
	return (
		<Container>
			<div className='flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-10'>
				<div className='pt-4 h-fit md:max-w-sm'>
					<Scoreboard />
				</div>
				<Card className='pt-4 h-fit md:max-w-md'>
					<CardContent>
						<Top25 />
					</CardContent>
				</Card>
				<Card className='pt-4 h-fit md:max-w-xs'>
					<CardContent>
						<ConferenceList />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
