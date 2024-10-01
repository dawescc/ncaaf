import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";
import { PiRankingFill } from "react-icons/pi";
import TeamLogo from "./team/teamLogo";
import { getTeamSlug } from "@/lib/utils";

type Ranking = {
	current: number;
	team: {
		$ref: string;
	};
	record: {
		summary: string;
		stats: {
			displayValue: string;
		}[];
	};
};

type TeamInfo = {
	id: string;
	shortName: string;
	logos: {
		href: string;
		alt: string;
		width: number;
		height: number;
	}[];
};

type ConferenceRecord = {
	displayValue: string;
};

async function fetchWithRevalidate(url: string) {
	try {
		const response = await fetch(url, { next: { revalidate: 43200 } }); // Revalidate every 12 hours
		if (!response.ok) throw new Error(`Failed to fetch ${url}`);
		return response.json();
	} catch (error) {
		console.error(`Error fetching ${url}:`, error);
		throw error;
	}
}

async function getCurrentSeason(): Promise<string> {
	const seasonsData = await fetchWithRevalidate("https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons");
	return seasonsData.items[0].$ref.split("/").slice(-1)[0].split("?")[0];
}

async function getConferenceRecord(teamId: string, season: string): Promise<ConferenceRecord | null> {
	const recordData = await fetchWithRevalidate(
		`http://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${season}/types/2/teams/${teamId}/records/9`
	);
	if (recordData.displayValue) {
		return {
			displayValue: recordData.displayValue,
		};
	}
	return null;
}

async function fetchRankings(): Promise<{ rankings: Ranking[]; headline: { long: string; short: string } }> {
	const rankingsData = await fetchWithRevalidate("https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/rankings/1");

	return {
		rankings: rankingsData.ranks,
		headline: {
			long: rankingsData.headline,
			short: rankingsData.shortHeadline,
		},
	};
}

async function fetchTeamInfo(teamRef: string): Promise<TeamInfo> {
	const teamData = await fetchWithRevalidate(teamRef);
	const collegeId = teamData.id;
	const collegeData = await fetchWithRevalidate(`https://sports.core.api.espn.com/v2/colleges/${collegeId}`);

	return {
		id: collegeData.id,
		shortName: collegeData.shortName,
		logos: collegeData.logos,
	};
}

const Top25 = async () => {
	try {
		const [{ rankings, headline }, currentSeason] = await Promise.all([fetchRankings(), getCurrentSeason()]);

		const rankingsWithTeamInfo = await Promise.all(
			rankings.map(async (ranking) => {
				const teamInfo = await fetchTeamInfo(ranking.team.$ref);
				const conferenceRecord = await getConferenceRecord(teamInfo.id, currentSeason);
				return { ...ranking, teamInfo, conferenceRecord };
			})
		);

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
						<TableHead className='p-2 md:p-4'>W</TableHead>
						<TableHead className='p-2 md:p-4'>L</TableHead>
						<TableHead className='text-right p-2 md:p-4'>Conf</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rankingsWithTeamInfo.map((ranking) => (
						<TableRow key={ranking.current}>
							<TableCell className='p-2 md:p-4'>{ranking.current}</TableCell>
							<TableCell className='p-2 md:p-4'>
								<Link
									href={`/teams/${getTeamSlug(parseInt(ranking.teamInfo.id))}`}
									className='flex items-center'>
									<TeamLogo
										teamId={parseInt(ranking.teamInfo.id)}
										height={32}
										width={32}
										className='mr-4'
									/>
									<span className='font-medium'>{ranking.teamInfo.shortName}</span>
								</Link>
							</TableCell>
							<TableCell className='p-2 md:p-4'>{ranking.record.stats[0]?.displayValue ?? "N/A"}</TableCell>
							<TableCell className='p-2 md:p-4'>{ranking.record.stats[1]?.displayValue ?? "N/A"}</TableCell>
							<TableCell className='text-right p-2 md:p-4'>{ranking.conferenceRecord?.displayValue ?? "N/A"}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	} catch (error) {
		console.error("Failed to fetch rankings:", error);
		return <div>Failed to load rankings. Please try again later.</div>;
	}
};

export default Top25;
