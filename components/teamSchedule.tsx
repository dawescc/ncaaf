import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";
import { getCurrentSeasonYear, getEventDate, isEventTimeValid, isEventCompleted, getEventCompetitors, getTeamInfo, getTeamRank, getScore } from "@/lib/actions";
import { Team } from "@/lib/types";
import Link from "next/link";

type TeamScheduleProps = {
	teamId: number;
};

type Event = {
	id: string;
	$ref: string;
};

async function fetchTeamSchedule(teamId: number, seasonYear: number): Promise<Event[]> {
	const response = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${seasonYear}/teams/${teamId}/events`, {
		next: { revalidate: 3600 }, // Cache for 1 hour
	});

	if (!response.ok) {
		throw new Error("Failed to fetch team schedule");
	}

	const data = await response.json();
	return data.items;
}

function parseEventId(ref: string): string {
	const match = ref.match(/events\/(\d+)/);
	return match ? match[1] : "N/A";
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

const TeamSchedule = async ({ teamId }: TeamScheduleProps) => {
	const seasonYear = await getCurrentSeasonYear();
	const events = await fetchTeamSchedule(teamId, seasonYear);

	return (
		<Table>
			<TableTitle>Team Schedule</TableTitle>
			<TableHeader>
				<TableRow>
					<TableHead className='p-2 md:p-4'>Game</TableHead>
					<TableHead className='p-2 md:p-4'>Date/Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{await Promise.all(
					events.map(async (event) => {
						const eventId = parseEventId(event.$ref);
						const date = await getEventDate(parseInt(eventId));
						const isTimeValid = await isEventTimeValid(parseInt(eventId));
						const isCompleted = await isEventCompleted(parseInt(eventId));
						const competitors = await getEventCompetitors(parseInt(eventId));

						const [homeTeam, awayTeam, homeTeamRank, awayTeamRank] = await Promise.all([
							getTeamInfo(competitors.homeTeamId),
							getTeamInfo(competitors.awayTeamId),
							getTeamRank(competitors.homeTeamId),
							getTeamRank(competitors.awayTeamId),
						]);

						let timeDisplay;
						if (!isTimeValid) {
							timeDisplay = "TBD";
						} else if (isCompleted) {
							timeDisplay = "FINAL";
						} else {
							timeDisplay = formatTime(date);
						}

						let awayScore, homeScore;
						if (isCompleted) {
							[awayScore, homeScore] = await Promise.all([
								getScore(parseInt(eventId), competitors.awayTeamId),
								getScore(parseInt(eventId), competitors.homeTeamId),
							]);
						}

						return (
							<TableRow key={eventId}>
								<TableCell className='p-2 md:p-4'>
									<div className='flex flex-col space-y-2'>
										<TeamDisplay
											team={awayTeam}
											rank={awayTeamRank}
											score={awayScore}
											opponentScore={homeScore}
										/>
										<TeamDisplay
											team={homeTeam}
											rank={homeTeamRank}
											score={homeScore}
											opponentScore={awayScore}
										/>
									</div>
								</TableCell>
								<TableCell className='p-2 md:p-4'>
									<Link href={`/events/${eventId}`}>
										<div>{formatDate(date)}</div>
										<div>{timeDisplay}</div>
									</Link>
								</TableCell>
							</TableRow>
						);
					})
				)}
			</TableBody>
		</Table>
	);
};

const TeamDisplay = ({ team, rank, score, opponentScore }: { team: Team; rank: number | null; score?: number; opponentScore?: number }) => {
	const isWinner = score !== undefined && opponentScore !== undefined && score > opponentScore;

	return (
		<Link
			className='flex items-center space-x-2'
			href={`/teams/${team.slug}`}>
			<Image
				src={team.logos[0].href}
				alt={team.displayName}
				width={32}
				height={32}
			/>
			<div className='flex items-baseline space-x-1'>
				{rank !== null && rank <= 25 && <span className='text-xs font-semibold'>{rank}</span>}
				<span className={`${isWinner ? "font-bold text-green-600" : ""}`}>{team.displayName}</span>
				{score !== undefined && <span className='text-sm'>({score})</span>}
			</div>
		</Link>
	);
};

export default TeamSchedule;
