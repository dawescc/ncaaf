import { teams } from "@/data/teams";
import { conferences } from "@/data/conferences";
import TeamButton from "@/components/teamButton";

function getTeamsByConference(conferenceId: string | null) {
	if (!conferenceId) return Object.values(teams);
	const conference = Object.values(conferences).find((conf) => conf.id === conferenceId);
	if (!conference) return [];
	return conference.teams.map((teamId) => Object.values(teams).find((team) => team.id === teamId)).filter(Boolean);
}

export default async function Home({ searchParams }: { searchParams: { conference?: string } }) {
	const selectedConference = searchParams.conference || null;
	const filteredTeams = getTeamsByConference(selectedConference);

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<div className='flex flex-wrap gap-4'>
					<a
						href='/'
						className={`p-2 rounded-lg border ${selectedConference === null ? "bg-gray-300" : "bg-white"}`}>
						All Teams
					</a>
					{Object.values(conferences).map((conference) => (
						<a
							key={conference.id}
							href={`/?conference=${conference.id}`}
							className={`p-2 rounded-lg border ${selectedConference === conference.id ? "bg-gray-300" : "bg-white"}`}>
							{conference.name}
						</a>
					))}
				</div>
				<div className='flex flex-col sm:flex-row flex-wrap gap-4'>
					{filteredTeams.map((team) => (
						<span key={team?.id}>
							<TeamButton id={team?.id as string} />
						</span>
					))}
				</div>
			</main>
		</div>
	);
}
