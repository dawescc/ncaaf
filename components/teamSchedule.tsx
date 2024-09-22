import Image from "next/image";
import Link from "next/link";

interface Team {
	location: string;
	abbreviation: string;
	displayName: string;
	id: string;
	nickname: string;
	shortDisplayName: string;
	logos: { href: string }[];
}

interface Competitor {
	homeAway: "home" | "away";
	team: Team;
	score?: { displayValue: string };
	winner?: boolean;
}

interface Competition {
	competitors: Competitor[];
}

interface Event {
	id: string;
	date: string;
	competitions: Competition[];
	status?: { type?: { completed: boolean; description: string } };
	timeValid: boolean;
}

interface ScheduleData {
	events: Event[];
}

interface TeamScheduleProps {
	teamid: string;
}

const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const isToday = (dateString: string) => {
	const today = new Date();
	const date = new Date(dateString);
	return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const highlightGame = (events: Event[]) => {
	const today = new Date();
	let nextGame = null;

	for (const event of events) {
		const eventDate = new Date(event.date);
		if (isToday(event.date)) {
			return event.id;
		}

		if (eventDate > today) {
			if (!nextGame || eventDate < new Date(nextGame.date)) {
				nextGame = event;
			}
		}
	}

	return nextGame ? nextGame.id : null;
};

export default async function TeamSchedule({ teamid }: TeamScheduleProps) {
	const res = await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${teamid}/schedule`);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.statusText}`);
	}
	const data: ScheduleData = await res.json();

	const highlightedGameId = highlightGame(data.events);

	return (
		<div className='flex flex-col gap-0 py-6 bg-gray-100'>
			{data.events.map((event) => {
				const homeTeam = event.competitions[0].competitors.find((team) => team.homeAway === "home");
				const awayTeam = event.competitions[0].competitors.find((team) => team.homeAway === "away");
				const isHighlighted = event.id === highlightedGameId;
				const isCompleted = event.status?.type?.completed;
				const hasScore = homeTeam?.score?.displayValue || awayTeam?.score?.displayValue;

				return (
					<div
						key={event.id}
						className={`flex items-center justify-between py-2 px-4 border-b border-gray-300 ${isHighlighted ? "bg-yellow-200" : "bg-white"}`}>
						<div className='flex items-center gap-2'>
							<TeamDisplay
								team={awayTeam?.team}
								score={awayTeam?.score?.displayValue}
							/>
							<span className='text-xs font-bold'>@</span>
							<TeamDisplay
								team={homeTeam?.team}
								score={homeTeam?.score?.displayValue}
							/>
						</div>
						<div className='text-right text-xs text-gray-600'>
							{isCompleted || hasScore ? (
								<span className='font-semibold text-red-500'>FINAL</span>
							) : (
								<span>{event.timeValid ? formatDate(event.date) : "TBD"}</span>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

function TeamDisplay({ team, score }: { team?: Team; score?: string }) {
	if (!team) return null;

	return (
		<Link
			href={`/team/${team.id}`}
			className='flex items-center gap-1'>
			<Image
				src={team.logos[0].href}
				alt={team.displayName}
				width={20}
				height={20}
			/>
			<span className='text-xs font-semibold'>{team.abbreviation}</span>
			{score && <span className='text-lg font-bold ml-2'>{score}</span>}
		</Link>
	);
}
