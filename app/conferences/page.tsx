import ConferenceList from "@/components/confList";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const ConferencesPage = () => {
	return (
		<Container>
			<Card className='pt-4 h-fit'>
				<CardContent>
					<ConferenceList />
				</CardContent>
			</Card>
		</Container>
	);
};

export default ConferencesPage;
