import Image from "next/image";
import { getCurrentWeekNumber } from "@/lib/actions";
import Link from "next/link";
import { Suspense } from "react";
import { use } from "react";
import { Card, CardContent } from "./ui/card";
import { FaFootballBall } from "react-icons/fa";
import { teams } from "@/data/teams";
import { formatDateTime } from "@/lib/utils";

// Define types
type WeekGamesProps = {
	weekNumber?: number;
};

export interface Event {
	id: string;
	uid: string;
	date: string;
	name: string;
	shortName: string;
	season: Season;
	week: Week;
	competitions: Competition[];
	links: Link3[];
	status: Status2;
}

export interface Status2 {
	clock: number;
	displayClock: string;
	period: number;
	type: Type4;
}

export interface Type4 {
	id: string;
	name: string;
	state: string;
	completed: boolean;
	description: string;
	detail: string;
	shortDetail: string;
}

export interface Season {
	year: number;
	type: number;
	slug: string;
}

export interface Week {
	number: number;
}

export interface Competition {
	id: string;
	uid: string;
	date: string;
	attendance: number;
	type: Type;
	timeValid: boolean;
	neutralSite: boolean;
	conferenceCompetition: boolean;
	playByPlayAvailable: boolean;
	recent: boolean;
	venue: Venue;
	competitors: Competitor[];
	status: Status;
	broadcasts: Broadcast[];
	leaders: Leader[];
	groups: Groups;
	format: Format;
	startDate: string;
	broadcast: string;
	geoBroadcasts: GeoBroadcast[];
	headlines: Headline[];
}

export interface Type {
	id: string;
	abbreviation: string;
}

export interface Venue {
	id: string;
	fullName: string;
	address: Address;
	indoor: boolean;
}

export interface Address {
	city: string;
	state: string;
}

export interface Competitor {
	id: string;
	uid: string;
	type: string;
	order: number;
	homeAway: string;
	winner: boolean;
	team: Team;
	score: string;
	linescores: Linescore[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	statistics: any[];
	curatedRank: CuratedRank;
	records: Record[];
}

export interface Team {
	id: string;
	uid: string;
	location: string;
	name: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	color: string;
	alternateColor: string;
	isActive: boolean;
	venue: Venue2;
	links: Link[];
	logo: string;
	conferenceId: string;
}

export interface Venue2 {
	id: string;
}

export interface Link {
	rel: string[];
	href: string;
	text: string;
	isExternal: boolean;
	isPremium: boolean;
}

export interface Link3 {
	language: string;
	rel: string[];
	href: string;
	text: string;
	shortText: string;
	isExternal: boolean;
	isPremium: boolean;
}

export interface Linescore {
	value: number;
}

export interface CuratedRank {
	current: number;
}

export interface Record {
	name: string;
	abbreviation?: string;
	type: string;
	summary: string;
}

export interface Status {
	clock: number;
	displayClock: string;
	period: number;
	type: Type2;
	isTBDFlex: boolean;
}

export interface Type2 {
	id: string;
	name: string;
	state: string;
	completed: boolean;
	description: string;
	detail: string;
	shortDetail: string;
}

export interface Broadcast {
	market: string;
	names: string[];
}

export interface Leader {
	name: string;
	displayName: string;
	shortDisplayName: string;
	abbreviation: string;
	leaders: Leader2[];
}

export interface Leader2 {
	displayValue: string;
	value: number;
	athlete: Athlete;
	team: Team3;
}

export interface Athlete {
	id: string;
	fullName: string;
	displayName: string;
	shortName: string;
	links: Link2[];
	headshot: string;
	jersey: string;
	position: Position;
	team: Team2;
	active: boolean;
}

export interface Link2 {
	rel: string[];
	href: string;
}

export interface Position {
	abbreviation: string;
}

export interface Team2 {
	id: string;
}

export interface Team3 {
	id: string;
}

export interface Groups {
	id: string;
	name: string;
	shortName: string;
	isConference: boolean;
}

export interface Format {
	regulation: Regulation;
}

export interface Regulation {
	periods: number;
}

export interface GeoBroadcast {
	type: Type3;
	market: Market;
	media: Media;
	lang: string;
	region: string;
}

export interface Type3 {
	id: string;
	shortName: string;
}

export interface Market {
	id: string;
	type: string;
}

export interface Media {
	shortName: string;
	logo: string;
	darkLogo: string;
}

export interface Headline {
	type: string;
	description: string;
	shortLinkText: string;
}

export interface Links {
	web: Web;
}

export interface Web {
	href: string;
	self: Self;
}

export interface Self {
	href: string;
}

// Data fetching function
async function fetchWeekGames(weekNumber: number): Promise<Event[]> {
	const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?week=${weekNumber}&groups=80`, {
		next: { revalidate: 5 }, // Revalidate every minute
	});

	if (!response.ok) {
		throw new Error("Failed to fetch week games");
	}

	const data = await response.json();
	return data.events;
}

/////

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

const WeekGamesContent = ({ gamesPromise }: { weekNumber: number; gamesPromise: Promise<Event[]> }) => {
	const games = use(gamesPromise);
	games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<div className='space-y-2 max-w-md mx-auto'>
			{games.map((game) => (
				<GameCard
					key={game.id}
					game={game}
				/>
			))}
		</div>
	);
};

const GameCard = ({ game }: { game: Event }) => {
	const homeTeam = game.competitions[0].competitors.find((c) => c.homeAway === "home")!;
	const awayTeam = game.competitions[0].competitors.find((c) => c.homeAway === "away")!;
	const broadcast = game.competitions[0].broadcasts?.[0]?.names.join("/") || "";
	const gameState = game.status.type.state;

	return gameState === "pre" ? (
		<PreGameCard
			game={game}
			homeTeam={homeTeam}
			awayTeam={awayTeam}
			broadcast={broadcast}
		/>
	) : (
		<LiveCompletedGameCard
			game={game}
			homeTeam={homeTeam}
			awayTeam={awayTeam}
			broadcast={broadcast}
		/>
	);
};

const PreGameCard = ({ game, homeTeam, awayTeam, broadcast }: { game: Event; homeTeam: Competitor; awayTeam: Competitor; broadcast: string }) => {
	const timeDisplay = game.competitions[0].timeValid ? formatDateTime(game.date) : "TBD";

	return (
		<Card className='overflow-hidden bg-accent'>
			<CardContent className='p-4'>
				<div className='flex flex-col space-y-2'>
					<div className='flex justify-between items-center text-sm'>
						<span>{timeDisplay}</span>
						<span>{broadcast}</span>
					</div>
					<div className='flex justify-between items-center'>
						<PreGameTeamDisplay team={awayTeam} />
						<PreGameTeamDisplay team={homeTeam} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const PreGameTeamDisplay = ({ team }: { team: Competitor }) => (
	<div className='flex items-center space-x-2'>
		<Image
			src={team.team.logo}
			alt={team.team.displayName}
			width={40}
			height={40}
		/>
		<div>
			<div className='text-sm font-medium'>
				{team.curatedRank.current !== 99 && <span className='text-xs'>{team.curatedRank.current}&nbsp;</span>}
				<span className='font-bold'>{team.team.shortDisplayName}</span>
			</div>
			<div className='text-xs'>{team.records[0].summary}</div>
		</div>
	</div>
);

const LiveCompletedGameCard = ({ game, homeTeam, awayTeam, broadcast }: { game: Event; homeTeam: Competitor; awayTeam: Competitor; broadcast: string }) => {
	const isLive = game.status.type.state === "in";
	const timeDisplay = isLive ? `${game.status.type.shortDetail} ${game.status.displayClock}` : game.status.type.shortDetail;

	// Find the boxscore link
	const boxscoreLink = game.links.find((link) => link.text === "Box Score");

	return (
		<Card className='overflow-hidden'>
			<CardContent className='p-4'>
				<div className='flex flex-col space-y-4'>
					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>{timeDisplay}</span>
						{isLive ? (
							<span>{broadcast}</span>
						) : (
							boxscoreLink && (
								<Link
									href={boxscoreLink.href}
									className='hover:underline'>
									Boxscore
								</Link>
							)
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<LiveCompletedTeamDisplay
							team={awayTeam}
							isLive={isLive}
						/>
						<LiveCompletedTeamDisplay
							team={homeTeam}
							isLive={isLive}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const LiveCompletedTeamDisplay = ({ team, isLive }: { team: Competitor; isLive: boolean }) => {
	const teamWon = !isLive && team.winner;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const teamSlug = Object.entries(teams).find(([_, t]) => t.id === team.id)?.[0] || team.id;

	return (
		<div className='flex items-center gap-2'>
			<Image
				src={team.team.logo}
				alt={team.team.displayName}
				width={40}
				height={40}
			/>
			<div>
				<Link
					href={`/teams/${teamSlug}`}
					className='text-lg font-bold flex items-center space-x-2'>
					{team.curatedRank.current !== 99 && <span className='text-sm font-normal'>{team.curatedRank.current}</span>}
					<span className={teamWon ? "text-green-500" : ""}>{team.team.shortDisplayName}</span>
					{isLive && team.homeAway === "home" && <FaFootballBall className='text-yellow-400' />}
				</Link>
				<div className='text-sm'>{team.records[0].summary}</div>
			</div>
			<div className={`text-3xl font-bold ml-auto ${teamWon ? "text-green-500" : ""}`}>{team.score}</div>
		</div>
	);
};

export default WeekGames;
