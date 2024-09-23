import Image from "next/image";
import Link from "next/link";

type Team = {
	id: number;
	name: string;
	logo: string;
	slug: string;
	conferenceRecord: {
		wins: number;
		losses: number;
	} | null;
};

type Ranking = {
	current: number;
	points: number;
	firstPlaceVotes: number;
	record: {
		wins: number;
		losses: number;
	};
	team: Team;
};

type RecordData = {
	items: {
		description: string;
		stats: {
			name: string;
			value: number;
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

type RankData = {
	current: number;
	points: number;
	firstPlaceVotes: number;
	record: {
		stats: {
			name: string;
			value: number;
		}[];
	};
	team: { $ref: string };
};

const fetchTeamRecord = async (recordRef: string): Promise<Team["conferenceRecord"]> => {
	const recordResponse = await fetch(recordRef);
	const recordData: RecordData = await recordResponse.json();
	const conferenceRecordItem = recordData.items.find((item) => item.description === "Conference Record");

	const conferenceRecord = conferenceRecordItem
		? {
				wins: conferenceRecordItem.stats.find((stat) => stat.name === "wins")?.value || 0,
				losses: conferenceRecordItem.stats.find((stat) => stat.name === "losses")?.value || 0,
		  }
		: null;

	return conferenceRecord;
};

const fetchRankings = async (): Promise<Ranking[]> => {
	const rankingsResponse = await fetch("https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/rankings/1");
	const rankingsData = await rankingsResponse.json();
	const ranks: RankData[] = rankingsData.ranks;

	const teamPromises = ranks.map(async (rank) => {
		const teamResponse = await fetch(rank.team.$ref);
		const teamData: TeamData = await teamResponse.json();

		const conferenceRecord = teamData.record ? await fetchTeamRecord(teamData.record.$ref) : null;

		return {
			current: rank.current,
			points: rank.points,
			firstPlaceVotes: rank.firstPlaceVotes,
			record: {
				wins: rank.record.stats.find((stat) => stat.name === "wins")?.value || 0,
				losses: rank.record.stats.find((stat) => stat.name === "losses")?.value || 0,
			},
			team: {
				id: teamData.id,
				name: teamData.displayName,
				logo: teamData.logos[0]?.href || "",
				slug: teamData.slug,
				conferenceRecord,
			},
		};
	});

	return Promise.all(teamPromises);
};

const Top25 = async () => {
	const rankings = await fetchRankings();

	return (
		<div className='overflow-x-auto border-gray-200/50 border-[1px] shadow-sm rounded-lg'>
			<table className='w-full min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Rank</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Team</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>W</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>L</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Conf</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{rankings.map((ranking) => (
						<tr key={ranking.team.id}>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{ranking.current}</td>
							<td className='px-2 py-4 whitespace-nowrap flex items-center sm:px-6'>
								<Link
									href={`/teams/${ranking.team.slug}`}
									className='flex items-center'>
									<Image
										src={ranking.team.logo}
										alt={ranking.team.name}
										width={32}
										height={32}
										className='mr-4'
									/>
									<span className='font-medium text-gray-900'>{ranking.team.name}</span>
								</Link>
							</td>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{ranking.record.wins}</td>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{ranking.record.losses}</td>
							<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>
								{ranking.team.conferenceRecord ? `${ranking.team.conferenceRecord.wins}-${ranking.team.conferenceRecord.losses}` : "N/A"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Top25;
