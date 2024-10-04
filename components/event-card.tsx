/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import TeamLogo from "@/components/team/team-logo";
import { Badge } from "@/components/ui/badge";
import { MdStadium } from "react-icons/md";
import { IoAmericanFootball } from "react-icons/io5";
import { format, parseISO } from "date-fns";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface EventPayload {
	id: string;
	startDate: string;
	status: "pre" | "in" | "post";
	valid: boolean;
}

function determineRefreshInterval(payload: EventPayload): number {
	const now = new Date();
	const startTime = new Date(payload.startDate);
	const timeDiff = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

	if (payload.status === "post") {
		return 24 * 60 * 60 * 1000;
	} else if (payload.status === "in" || (payload.status === "pre" && payload.valid && timeDiff <= 1)) {
		return 10 * 1000;
	} else {
		return 60 * 60 * 1000;
	}
}

export default function EventCard({ payload }: { payload: EventPayload }) {
	const [refreshInterval, setRefreshInterval] = useState(determineRefreshInterval(payload));

	useEffect(() => {
		const interval = setInterval(() => {
			setRefreshInterval(determineRefreshInterval(payload));
		}, 60000);

		return () => clearInterval(interval);
	}, [payload]);

	const url = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?&groups=80";
	const { data, error } = useSWR(url, fetcher, {
		refreshInterval,
	});

	if (error) return <div className='text-red-500'>Failed to load event</div>;
	if (!data) return <LoadDisplay />;

	const event = data.events.find((e: any) => e.id === payload.id);

	if (!event) return <div>Event not found</div>;

	return <EventDisplay event={event} />;
}

const EventDisplay = ({ event }: any) => {
	return (
		<div className='bg-card text-card-foreground border rounded-lg shadow-sm text-sm'>
			<div className='flex items-center p-2'>
				<div className='flex grow justify-between'>
					<div className='flex items-center grow'>
						<TeamLogo
							id={event.competitions[0].competitors[0].team.id}
							alt={event.competitions[0].competitors[0].team.displayName}
							width={20}
							height={20}
							className='inline mr-2'
						/>
						<span className='font-medium text-base'>{event.competitions[0].competitors[0].team.displayName}</span>
						{event.status.type.state === "in" &&
							event.competitions[0].situation.lastPlay.team.id === event.competitions[0].competitors[0].team.id && (
								<span className='ml-auto text-yellow-500'>&#9679;</span>
							)}
						{event.competitions[0].competitors[0].winner && <span className='mx-1 font-bold text-green-500'>W</span>}
						{["in", "post"].includes(event.status.type.state) && (
							<span className='ml-auto text-large font-black'>{event.competitions[0].competitors[0].score}</span>
						)}
					</div>
					{["in", "post"].includes(event.status.type.state) ? <div className='flex justify-center px-4'>&sdot;</div> : null}
					<div className='flex items-center justify-end grow'>
						{["in", "post"].includes(event.status.type.state) && (
							<span className='mr-auto text-large font-black'>{event.competitions[0].competitors[1].score}</span>
						)}
						{event.status.type.state === "in" &&
							event.competitions[0].situation.lastPlay.team.id === event.competitions[0].competitors[1].team.id && (
								<span className='ml-auto text-yellow-500'>&#9679;</span>
							)}
						{event.competitions[0].competitors[1].winner && <span className='mx-1 font-bold text-green-500'>W</span>}
						<span className='font-medium text-base'>{event.competitions[0].competitors[1].team.displayName}</span>
						<TeamLogo
							id={event.competitions[0].competitors[1].team.id}
							alt={event.competitions[0].competitors[1].team.displayName}
							width={20}
							height={20}
							className='inline ml-2'
						/>
					</div>
				</div>
			</div>
			<div className='px-1 py-1.5 flex gap-1'>
				{event.status.type.state === "post" ? (
					<>
						<Badge>Final</Badge>
						<Badge variant={"secondary"}>{format(parseISO(event.date), "PP")}</Badge>
						<Badge variant={"secondary"}>
							<MdStadium />
							&nbsp;&nbsp;{parseInt(event.competitions[0].attendance).toLocaleString()}
						</Badge>
					</>
				) : event.status.type.state === "in" ? (
					<>
						<Badge variant='outline'>
							{event.competitions[0].status.displayClock} &sdot; Q{event.competitions[0].status.period}
						</Badge>
						<Badge variant='outline'>
							{event.competitions[0].situation.shortDownDistanceText} &sdot; {event.competitions[0].situation.possessionText}
						</Badge>
					</>
				) : (
					<>
						<Badge variant={"secondary"}>{format(parseISO(event.date), "PPp")}</Badge>
						<Badge variant={"secondary"}>
							{event.competitions[0].venue.fullName}, {event.competitions[0].venue.address.state}
						</Badge>
						<Badge variant={"secondary"}>{event.competitions[0].broadcasts[0].names}</Badge>
					</>
				)}
			</div>

			{event.status.type.state === "in" ? (
				<div className='px-1 py-1.5 flex gap-1 items-center'>
					<IoAmericanFootball className='inline' />
					<span className='font-light text-accent-foreground'>{event.competitions[0].situation.lastPlay.text}.</span>
				</div>
			) : null}
		</div>
	);
};

const LoadDisplay = () => {
	return (
		<div className='bg-card text-card-foreground border rounded-lg shadow-sm text-sm'>
			<div className='flex items-center p-2'>
				<div className='flex flex-col gap-1 grow justify-between'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
				</div>
			</div>
			<div className='px-1 py-1.5 flex gap-1'>
				<Skeleton className='h-4 w-full' />
			</div>
		</div>
	);
};
