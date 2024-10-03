import ConferenceList from "@/components/conference/conference-list";
import { PageContent, PageHeader, PageSide, PageTitle, PageWrapper } from "@/components/ui/page-wrapper";

const ConferencesPage = () => {
	return (
		<PageWrapper>
			<PageContent>
				<PageHeader>
					<PageTitle>FBS I-A Conferences</PageTitle>
				</PageHeader>
				<ConferenceList />
			</PageContent>
			<PageSide group={80}></PageSide>
		</PageWrapper>
	);
};

export default ConferencesPage;
