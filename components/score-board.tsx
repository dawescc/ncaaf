/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCard from "./event-card";

interface EventPayload {
	id: string;
	startDate: string;
	status: "pre" | "in" | "post";
	valid: boolean;
}

async function fetchScoreboard(): Promise<EventPayload[]> {
	const url = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?&groups=80";
	const response = await fetch(url, {
		next: { revalidate: 3600 },
	});
	if (!response.ok) throw new Error("Failed to fetch scoreboard");
	const data = await response.json();

	return data.events
		.map((event: any) => ({
			id: event.id,
			startDate: event.competitions[0].startDate,
			status: event.status.type.state,
			valid: event.competitions[0].timeValid,
		}))
		.sort(
			(a: { startDate: string | number | Date }, b: { startDate: string | number | Date }) =>
				new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
		);
}

export default async function Scoreboard() {
	const events = await fetchScoreboard();

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
