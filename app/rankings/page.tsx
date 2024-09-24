import Top25 from "@/components/apRankings";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default async function Page() {
	return (
		<Container>
			<Card className='pt-4 h-fit'>
				<CardContent>
					<Top25 />
				</CardContent>
			</Card>
		</Container>
	);
}
