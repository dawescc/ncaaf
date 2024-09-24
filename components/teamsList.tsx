import Image from "next/image";
import Link from "next/link";

type Team = {
	id: number;
	name: string;
	logo: string;
	slug: string;
};

type TeamData = {
	id: number;
	displayName: string;
	logos: { href: string }[];
	slug: string;
};

const fetchTeamData = async (teamId: number): Promise<Team> => {
	const teamResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/2024/teams/${teamId}`);
	const teamData: TeamData = await teamResponse.json();

	return {
		id: teamData.id,
		name: teamData.displayName,
		logo: teamData.logos[0]?.href || "",
		slug: teamData.slug,
	};
};

const fetchTeams = async (teamIds: number[]): Promise<Team[]> => {
	const teamPromises = teamIds.map(async (teamId) => {
		return fetchTeamData(teamId);
	});

	return Promise.all(teamPromises);
};

const TeamsList = async ({ teamIds }: { teamIds: number[] }) => {
	const teams = await fetchTeams(teamIds);

	return (
		<div className='overflow-x-auto border-gray-200/50 border-[1px] shadow-sm rounded-lg'>
			<ul className='grid grid-cols-1 sm:grid-cols-2'>
				{teams.map((team, index) => (
					<li
						key={team.id}
						className={`px-2 py-4 sm:px-6 flex items-center border-b border-gray-200 ${index % 2 === 0 ? "sm:border-r" : ""}`}>
						<Link
							href={`/teams/${team.slug}`}
							className='flex items-center space-x-3 hover:underline'>
							<Image
								src={team.logo}
								alt={`${team.name} logo`}
								width={32}
								height={32}
								className='mr-4'
							/>
							<span className='font-medium text-gray-900'>{team.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TeamsList;
