import { getScoreBoard } from "@/lib/actions";
import PreGameCard from "@/components/preGameCard";
import LiveGameCard from "@/components/liveGameCard";
import PostGameCard from "@/components/postGameCard";
import { MdScoreboard } from "react-icons/md";

export default async function Scoreboard() {
	const events = await getScoreBoard();

	// Sort events by date (oldest last)
	const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<div className='flex flex-col gap-y-4'>
			<h2 className='section-header-text'>
				<MdScoreboard className='inline' /> Scoreboard
			</h2>
			<div className='flex flex-col gap-4'>
				{sortedEvents.map((event) => (
					<div key={event.id}>
						{event.status.type.state === "pre" && <PreGameCard event={event} />}
						{event.status.type.state === "in" && <LiveGameCard event={event} />}
						{event.status.type.state === "post" && <PostGameCard event={event} />}
					</div>
				))}
			</div>
		</div>
	);
}
