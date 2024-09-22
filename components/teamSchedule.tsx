import Image from "next/image";

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
		<div className='flex flex-col gap-2 p-4 bg-gray-100'>
			{data.events.map((event) => {
				const homeTeam = event.competitions[0].competitors.find((team) => team.homeAway === "home");
				const awayTeam = event.competitions[0].competitors.find((team) => team.homeAway === "away");
				const isHighlighted = event.id === highlightedGameId;

				return (
					<div
						key={event.id}
						className={`flex items-center justify-between p-2 border-b border-gray-300 ${isHighlighted ? "bg-yellow-200" : "bg-white"}`}>
						<div className='flex items-center gap-2'>
							{awayTeam && (
								<>
									<Image
										src={awayTeam.team.logos[0].href}
										alt={awayTeam.team.displayName}
										width={30}
										height={30}
									/>
									<span className='text-sm font-semibold'>{awayTeam.team.displayName}</span>
									{awayTeam.score && <span className='text-sm'>{awayTeam.score.displayValue}</span>}
								</>
							)}
						</div>
						<div className='flex items-center gap-2'>
							<div className='text-center text-sm font-bold'>@</div>
							{homeTeam && (
								<>
									<Image
										src={homeTeam.team.logos[0].href}
										alt={homeTeam.team.displayName}
										width={30}
										height={30}
									/>
									<span className='text-sm font-semibold'>{homeTeam.team.displayName}</span>
									{homeTeam.score && <span className='text-sm'>{homeTeam.score.displayValue}</span>}
								</>
							)}
						</div>
						<div className='text-right text-sm text-gray-600'>
							<span>{event.timeValid ? formatDate(event.date) : "TBD"}</span>
							{event.status?.type?.description && <span className='block text-xs text-red-500'>{event.status.type.description}</span>}
						</div>
					</div>
				);
			})}
		</div>
	);
}
