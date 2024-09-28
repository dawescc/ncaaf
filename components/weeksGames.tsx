import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";
import { getCurrentWeekNumber } from "@/lib/actions";
import Link from "next/link";
import { Suspense } from "react";
import { use } from "react";

// Define types
type WeekGamesProps = {
	weekNumber?: number;
};

type Team = {
	displayName: string;
	logo: string;
	abbreviation: string;
};

type Competitor = {
	id: string;
	homeAway: string;
	team: Team;
	score: string;
	curatedRank: {
		current: number;
	};
};

type GameEvent = {
	id: string;
	date: string;
	name: string;
	shortName: string;
	competitions: Array<{
		competitors: Competitor[];
	}>;
	status: {
		type: {
			state: "pre" | "in" | "post";
		};
		displayClock: string;
		period: number;
	};
};

// Utility functions
const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatTime = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

// Data fetching function
async function fetchWeekGames(weekNumber: number): Promise<GameEvent[]> {
	const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?week=${weekNumber}&groups=80`, {
		next: { revalidate: 5 }, // Revalidate every minute
	});

	if (!response.ok) {
		throw new Error("Failed to fetch week games");
	}

	const data = await response.json();
	return data.events;
}

// Main component
const WeekGames = async ({ weekNumber }: WeekGamesProps) => {
	const currentWeek = weekNumber || (await getCurrentWeekNumber());
	const gamesPromise = fetchWeekGames(currentWeek);

	return (
		<Suspense fallback={<div>Loading games...</div>}>
			<WeekGamesContent
				weekNumber={currentWeek}
				gamesPromise={gamesPromise}
			/>
		</Suspense>
	);
};

// Content component
const WeekGamesContent = ({ weekNumber, gamesPromise }: { weekNumber: number; gamesPromise: Promise<GameEvent[]> }) => {
	const games = use(gamesPromise);
	games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<Table>
			<TableTitle>Week {weekNumber} Games</TableTitle>
			<TableHeader>
				<TableRow>
					<TableHead className='p-2 md:p-4'>Game</TableHead>
					<TableHead className='p-2 md:p-4'>Date/Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{games.map((game) => (
					<GameRow
						key={game.id}
						game={game}
					/>
				))}
			</TableBody>
		</Table>
	);
};

// Game row component
const GameRow = ({ game }: { game: GameEvent }) => {
	const homeTeam = game.competitions[0].competitors.find((c) => c.homeAway === "home")!;
	const awayTeam = game.competitions[0].competitors.find((c) => c.homeAway === "away")!;
	const isCompleted = game.status.type.state === "post";
	const isInProgress = game.status.type.state === "in";

	const timeDisplay = isCompleted ? "FINAL" : isInProgress ? `${game.status.displayClock} - ${game.status.period}Q` : formatTime(game.date);

	const homeScore = parseInt(homeTeam.score);
	const awayScore = parseInt(awayTeam.score);

	return (
		<TableRow>
			<TableCell className='p-2 md:p-4'>
				<div className='flex flex-col space-y-2'>
					<TeamDisplay
						team={awayTeam.team}
						rank={awayTeam.curatedRank.current}
						score={isCompleted || isInProgress ? awayTeam.score : undefined}
						isWinning={(isCompleted || isInProgress) && awayScore > homeScore}
					/>
					<TeamDisplay
						team={homeTeam.team}
						rank={homeTeam.curatedRank.current}
						score={isCompleted || isInProgress ? homeTeam.score : undefined}
						isWinning={(isCompleted || isInProgress) && homeScore > awayScore}
					/>
				</div>
			</TableCell>
			<TableCell className='p-2 md:p-4'>
				<Link href={`/events/${game.id}`}>
					<div>{formatDate(game.date)}</div>
					<div>{timeDisplay}</div>
				</Link>
			</TableCell>
		</TableRow>
	);
};

// Team display component
const TeamDisplay = ({ team, rank, score, isWinning }: { team: Team; rank: number; score?: string; isWinning?: boolean }) => (
	<div className='flex items-center space-x-2'>
		<Image
			src={team.logo}
			alt={team.displayName}
			width={32}
			height={32}
		/>
		<div className='flex items-baseline space-x-1'>
			{rank <= 25 && <span className='text-xs font-semibold'>{rank}</span>}
			<span className={isWinning ? "font-bold text-green-600" : ""}>{team.abbreviation}</span>
			{score !== undefined && <span className='text-sm'>({score})</span>}
		</div>
	</div>
);

export default WeekGames;
