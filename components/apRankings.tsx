import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";
import TeamLogo from "@/components/team/teamLogoClient";
import { PiRankingFill } from "react-icons/pi";

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

const fetchRankings = async (): Promise<{ rankings: Ranking[]; headline: { long: string; short: string } }> => {
	const rankingsResponse = await fetch("https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/rankings/1");
	const rankingsData = await rankingsResponse.json();
	const ranks: RankData[] = rankingsData.ranks;
	const headline = {
		long: rankingsData.headline,
		short: rankingsData.shortHeadline,
	};

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

	const rankings = await Promise.all(teamPromises);
	return { rankings, headline };
};

const Top25 = async () => {
	const { rankings, headline } = await fetchRankings();
	return (
		<Table>
			<TableTitle>
				<PiRankingFill className='inline' /> {headline.short}
			</TableTitle>
			<TableCaption>{headline.long}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='p-2 md:p-4'>Rank</TableHead>
					<TableHead className='p-2 md:p-4'>Team</TableHead>
					<TableHead>W</TableHead>
					<TableHead>L</TableHead>
					<TableHead className='text-right p-2 md:p-4'>CONF</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rankings.map((ranking) => (
					<TableRow key={ranking.team.id}>
						<TableCell className='p-2 md:p-4'>{ranking.current}</TableCell>
						<TableCell className='p-2 md:p-4'>
							<Link
								href={`/teams/${ranking.team.slug}`}
								className='flex items-center'>
								<TeamLogo
									teamId={ranking.team.id}
									width={32}
									height={32}
									className='mr-4'
								/>
								<span className='font-medium'>{ranking.team.name}</span>
							</Link>
						</TableCell>
						<TableCell>{ranking.record.wins}</TableCell>
						<TableCell>{ranking.record.losses}</TableCell>
						<TableCell className='text-right p-2 md:p-4'>
							{ranking.team.conferenceRecord ? `${ranking.team.conferenceRecord.wins}-${ranking.team.conferenceRecord.losses}` : "N/A"}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default Top25;
