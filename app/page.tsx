import Top25 from "@/components/apRankings";
import ConferenceList from "@/components/confList";
import Scoreboard from "@/components/scoreBoard";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default async function Home() {
	return (
		<Container>
			<div className='grid grid-cols-1 sm:grid-cols-[1fr_1.33fr] gap-8'>
				<div className='pt-4 h-fit'>
					<Scoreboard />
				</div>
				<div className='grid-cols-subgrid col-span-1 grid xl:grid-cols-[1fr_0.66fr] gap-8'>
					<div className='pt-4 h-fit'>
						<Top25 />
					</div>
					<Card className='pt-4 h-fit'>
						<CardContent>
							<ConferenceList />
						</CardContent>
					</Card>
				</div>
			</div>
		</Container>
	);
}
