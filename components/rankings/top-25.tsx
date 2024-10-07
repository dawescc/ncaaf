import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TeamLogo from "@/components/team/team-logo";
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
	nickName: string;
	displayName: string;
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
		const response = await fetch(url, { next: { revalidate: 28800 } });
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
		nickName: collegeData.mascot,
		displayName: collegeData.displayName,
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
				<TableHeader>
					<TableRow>
						<TableHead>Rank</TableHead>
						<TableHead>Team</TableHead>
						<TableHead>W</TableHead>
						<TableHead>L</TableHead>
						<TableHead className='text-right'>Conf</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rankingsWithTeamInfo.map((ranking) => (
						<TableRow key={ranking.current}>
							<TableCell>{ranking.current}</TableCell>
							<TableCell>
								<Link
									href={`/teams/${getTeamSlug(parseInt(ranking.teamInfo.id))}`}
									className='flex items-center gap-2 hover:underline'>
									<TeamLogo
										id={ranking.teamInfo.id}
										height={20}
										width={20}
										className=''
										alt=''
									/>
									<span className='font-medium'>
										{ranking.teamInfo.shortName} {ranking.teamInfo.nickName}
									</span>
								</Link>
							</TableCell>
							<TableCell>{ranking.record.stats[0]?.displayValue ?? "N/A"}</TableCell>
							<TableCell>{ranking.record.stats[1]?.displayValue ?? "N/A"}</TableCell>
							<TableCell className='text-right'>{ranking.conferenceRecord?.displayValue ?? "N/A"}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableCaption className='font-sans'>{headline.short}</TableCaption>
			</Table>
		);
	} catch (error) {
		console.error("Failed to fetch rankings:", error);
		return <div>Failed to load rankings. Please try again later.</div>;
	}
};

export default Top25;
