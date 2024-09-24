import Image from "next/image";
import Link from "next/link";

type APIStanding = {
	team: {
		$ref: string;
	};
};

type Team = {
	id: number;
	name: string;
	logo: string;
	slug: string;
};

type Record = {
	wins: number;
	losses: number;
	streak: string;
	conferenceWins: number;
	conferenceLosses: number;
};

type Standing = {
	team: Team;
	record: Record;
};

type RecordData = {
	items: {
		description: string;
		stats: {
			name: string;
			value: number;
			displayValue: string;
		}[];
	}[];
};

type TeamData = {
	id: number;
	displayName: string;
	logos: { href: string }[];
	slug: string;
	record?: { $ref: string };
};

const fetchTeamRecord = async (recordRef: string): Promise<Record> => {
	const recordResponse = await fetch(recordRef);
	const recordData: RecordData = await recordResponse.json();
	const overallRecordItem = recordData.items.find((item) => item.description === "Overall Record");
	const conferenceRecordItem = recordData.items.find((item) => item.description === "Conference Record");

	return {
		wins: overallRecordItem?.stats.find((stat) => stat.name === "wins")?.value || 0,
		losses: overallRecordItem?.stats.find((stat) => stat.name === "losses")?.value || 0,
		streak: overallRecordItem?.stats.find((stat) => stat.name === "streak")?.displayValue || "",
		conferenceWins: conferenceRecordItem?.stats.find((stat) => stat.name === "wins")?.value || 0,
		conferenceLosses: conferenceRecordItem?.stats.find((stat) => stat.name === "losses")?.value || 0,
	};
};

const fetchStandings = async (conf_id: number): Promise<Standing[]> => {
	const response = await fetch(
		`https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/2024/types/2/groups/${conf_id}/standings/1`
	);
	const data: { standings: APIStanding[] } = await response.json();

	const standingsPromises = data.standings.map(async (standing: APIStanding) => {
		const teamResponse = await fetch(standing.team.$ref);
		const teamData: TeamData = await teamResponse.json();

		const record = teamData.record
			? await fetchTeamRecord(teamData.record.$ref)
			: {
					wins: 0,
					losses: 0,
					streak: "",
					conferenceWins: 0,
					conferenceLosses: 0,
			  };

		return {
			team: {
				id: teamData.id,
				name: teamData.displayName,
				logo: teamData.logos[0]?.href || "",
				slug: teamData.slug,
			},
			record,
		};
	});

	return Promise.all(standingsPromises);
};

const ConfStandings = async ({ conf_id }: { conf_id: number }) => {
	const standings = await fetchStandings(conf_id);

	return (
		<div className='overflow-x-auto border-gray-200/50 border-[1px] shadow-sm rounded-lg'>
			<table className='w-full min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Team</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>W</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>L</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Conf</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Streak</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{standings.map((standing) => (
						<tr key={standing.team.id}>
							<td className='px-2 py-4 whitespace-nowrap flex items-center sm:px-6'>
								<Link
									href={`/teams/${standing.team.slug}`}
									className='flex items-center'>
									<Image
										src={standing.team.logo}
										alt={standing.team.name}
										width={32}
										height={32}
										className='mr-4'
									/>
									<span className='font-medium text-gray-900'>{standing.team.name}</span>
								</Link>
							</td>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{standing.record.wins}</td>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{standing.record.losses}</td>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{`${standing.record.conferenceWins}-${standing.record.conferenceLosses}`}</td>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{standing.record.streak}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ConfStandings;
