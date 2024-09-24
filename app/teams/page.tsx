import TeamsList from "@/components/teamsList";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default async function TeamsPage() {
	return (
		<Container>
			<Card className='pt-4 h-fit'>
				<CardContent>
					<TeamsList />
				</CardContent>
			</Card>
		</Container>
	);
}
