/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCard from "@/components/scoreboard/event-card";

interface EventPayload {
	id: string;
	startDate: string;
	status: "pre" | "in" | "post";
	valid: boolean;
	team: number;
}

async function fetchScoreboard(team: number): Promise<EventPayload[]> {
	const url = `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team}/schedule`;

	const response = await fetch(url, {
		next: { revalidate: 3600 },
	});

	if (!response.ok) throw new Error("Failed to fetch scoreboard");

	const data = await response.json();

	return data.events
		.map((event: any) => ({
			id: event.id,
			startDate: event.date,
			status: event.competitions[0].status.type.state,
			valid: event.timeValid,
			team,
		}))
		.sort(
			(a: { startDate: string | number | Date }, b: { startDate: string | number | Date }) =>
				new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
		);
}

export default async function TeamSchedule({ team }: { team: number }) {
	let events: EventPayload[] = [];
	try {
		events = await fetchScoreboard(team);
	} catch (error) {
		console.error("Error fetching scoreboard:", error);
	}

	return (
		<div className='grid grid-cols-1 gap-4'>
			{events.map((event) => (
				<EventCard
					key={event.id}
					payload={event}
				/>
			))}
		</div>
	);
}
