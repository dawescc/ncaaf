import { getScoreBoard } from "@/lib/actions";
import PreGameCard from "@/components/preGameCard";
import LiveGameCard from "@/components/liveGameCard";
import PostGameCard from "@/components/postGameCard";

export default async function Scoreboard() {
	const events = await getScoreBoard();

	// Sort events by date (oldest last)
	const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<div className='flex flex-col gap-y-4 max-w-2xl mx-auto'>
			<h2 className='text-2xl font-black tracking-[-0.033em] font-serif'>Scoreboard</h2>
			{sortedEvents.map((event) => (
				<div key={event.id}>
					{event.status.type.state === "pre" && <PreGameCard event={event} />}
					{event.status.type.state === "in" && <LiveGameCard event={event} />}
					{event.status.type.state === "post" && <PostGameCard event={event} />}
				</div>
			))}
		</div>
	);
}
