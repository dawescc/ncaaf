import { teams, conferences } from "@/data/teams";
import TeamButton from "@/components/teamButton";

function getTeamsByConferences(conferenceIds: string[]) {
	if (conferenceIds.length === 0 || conferenceIds.length === Object.keys(conferences).length) {
		return Object.values(teams);
	}
	return Object.values(teams).filter((team) => conferenceIds.includes(team.conference));
}

export default async function Home({ searchParams }: { searchParams: { conferences?: string } }) {
	const allConferenceIds = Object.keys(conferences);
	const selectedConferences = searchParams.conferences ? searchParams.conferences.split(",") : [];
	const isAllSelected = selectedConferences.length === allConferenceIds.length || selectedConferences.length === 0;
	const filteredTeams = getTeamsByConferences(isAllSelected ? [] : selectedConferences);

	// Sort conferences to put selected ones first
	const sortedConferences = Object.entries(conferences).sort(([idA], [idB]) => {
		if (isAllSelected) return 0;
		const aSelected = selectedConferences.includes(idA);
		const bSelected = selectedConferences.includes(idB);
		return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
	});

	const toggleConference = (confId: string) => {
		let newConferences: string[];
		if (isAllSelected) {
			newConferences = [confId];
		} else if (selectedConferences.includes(confId)) {
			newConferences = selectedConferences.filter((id) => id !== confId);
		} else {
			newConferences = [...selectedConferences, confId];
		}

		if (newConferences.length === allConferenceIds.length) {
			return "/";
		}
		return newConferences.length > 0 ? `?conferences=${newConferences.join(",")}` : "/";
	};

	return (
		<div className='items-center justify-items-center min-h-screen p-8 pt-10 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 items-center sm:items-start'>
				<div className='w-full overflow-x-auto pb-2 custom-scrollbar'>
					<div className='flex flex-nowrap gap-2 min-w-max'>
						<a
							href='/'
							className={`p-2 px-4 rounded-md border whitespace-nowrap transition-colors ${
								isAllSelected ? "bg-gray-200 font-semibold" : "bg-white hover:bg-gray-100"
							}`}>
							All Teams
						</a>
						{sortedConferences.map(([confId, confInfo]) => (
							<a
								key={confId}
								href={toggleConference(confId)}
								className={`p-2 px-4 rounded-md border whitespace-nowrap transition-colors ${
									!isAllSelected && selectedConferences.includes(confId) ? "bg-gray-200 font-semibold" : "bg-white hover:bg-gray-100"
								}`}>
								{confInfo.short}
							</a>
						))}
					</div>
				</div>
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
					{filteredTeams.map((team) => (
						<TeamButton
							key={team.id}
							id={team.id}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
