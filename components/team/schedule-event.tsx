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
import { getTeamSlug } from "@/lib/utils";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface EventPayload {
	id: string;
	startDate: string;
	status: "pre" | "in" | "post";
	valid: boolean;
	team: number;
}

interface Competitor {
	team: {
		id: string;
		displayName: string;
		shortDisplayName: string;
	};
	score: {
		value: number;
		displayValue: string;
	};
	winner: boolean;
}

interface Event {
	id: string;
	date: string;
	competitions: {
		competitors: Competitor[];
		situation?: {
			lastPlay?: {
				team?: {
					id: string;
				};
				text: string;
			};
			shortDownDistanceText: string;
			possessionText: string;
		};
		status: {
			displayClock: string;
			period: number;
			type: {
				state: string;
			};
		};
		venue: {
			fullName: string;
			address: {
				state: string;
			};
		};
		broadcasts: {
			names: string[];
		}[];
		attendance: number;
	}[];
}

function determineRefreshInterval(payload: EventPayload): number {
	if (payload.status === "post") {
		return 24 * 60 * 60 * 1000; // Refresh daily for finished events
	} else if (payload.status === "in") {
		return 10 * 1000; // Refresh every 10 seconds for live events
	} else {
		return 60 * 60 * 1000; // Refresh hourly for upcoming events
	}
}

export default function EventCard({ payload }: { payload: EventPayload }) {
	const [refreshInterval, setRefreshInterval] = useState(determineRefreshInterval(payload));

	useEffect(() => {
		setRefreshInterval(determineRefreshInterval(payload));

		const interval = setInterval(() => {
			setRefreshInterval(determineRefreshInterval(payload));
		}, 60000);

		return () => clearInterval(interval);
	}, [payload]);

	const prod = `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${payload.team}/schedule`;
	const { data, error } = useSWR(prod, fetcher, {
		refreshInterval,
	});

	if (error) {
		console.error("Error loading event:", error);
		return <div className='text-red-500'>Failed to load event</div>;
	}
	if (!data) return <LoadDisplay />;

	const event = data.events.find((e: any) => e.id === payload.id);

	if (!event) {
		console.error("Event not found for ID:", payload.id);
		return <div>Event not found</div>;
	}

	return <EventDisplay event={event} />;
}

const TeamInfo = ({ competitor, isPossession, showScore, isHome }: { competitor: Competitor; isPossession: boolean; showScore: boolean; isHome: boolean }) => (
	<div className={`flex items-center w-1/2 flex-auto ${isHome ? "flex-row-reverse" : ""}`}>
		<Link
			href={`/teams/${getTeamSlug(parseInt(competitor.team.id))}`}
			className={`flex items-center ${isHome ? "flex-row-reverse" : ""}`}>
			<TeamLogo
				id={competitor.team.id}
				alt={competitor.team.displayName}
				width={24}
				height={24}
				className={`inline ${isHome ? "ml-2" : "mr-2"}`}
			/>
			<span className='hidden md:block text-xl'>{competitor.team.displayName}</span>
			<span className='md:hidden text-base md:text-xl'>{competitor.team.shortDisplayName}</span>
			{isPossession && <span className='mx-1 text-yellow-500'>&#9679;</span>}
		</Link>
		{competitor.winner && <span className='mx-1 font-bold text-green-500'>W</span>}
		{showScore && competitor.score && <span className={`${isHome ? "mr-auto" : "ml-auto"} text-large font-black`}>{competitor.score.displayValue}</span>}
	</div>
);

const ScoreSeparator = ({ show }: { show: boolean }) => (show ? <div className='flex justify-center items-center px-4'>&sdot;</div> : null);

const EventStatus = ({ event }: { event: Event }) => {
	const competition = event.competitions[0];
	const state = competition.status.type.state;

	if (state === "post") {
		return (
			<>
				<Badge>Final</Badge>
				<Badge variant='secondary'>{format(parseISO(event.date), "PP")}</Badge>
				<Badge variant='secondary'>
					<MdStadium />
					&nbsp;&nbsp;{competition.attendance.toLocaleString()}
				</Badge>
			</>
		);
	} else if (state === "in") {
		return (
			<>
				<Badge variant='outline'>
					{competition.status.displayClock} &sdot; Q{competition.status.period}
				</Badge>

				{competition.situation && (
					<Badge variant='outline'>
						{competition.situation.shortDownDistanceText} &sdot; {competition.situation.possessionText}
					</Badge>
				)}
			</>
		);
	} else {
		return (
			<>
				<Badge variant='secondary'>{format(parseISO(event.date), "PPp")}</Badge>
				<Badge variant='secondary'>
					{competition.venue.fullName}, {competition.venue.address.state}
				</Badge>
				{competition.broadcasts?.[0]?.names && <Badge variant='secondary'>{competition.broadcasts[0].names.join(", ")}</Badge>}
			</>
		);
	}
};

const EventDisplay = ({ event }: { event: Event }) => {
	const competition = event.competitions[0];
	const state = competition.status.type.state;
	const showScore = ["in", "post"].includes(state);

	return (
		<div className='bg-card text-card-foreground border rounded-lg shadow-sm text-sm p-2'>
			<div className='flex items-center'>
				<div className='flex grow justify-between'>
					<TeamInfo
						competitor={competition.competitors[1]}
						isPossession={(state === "in" && competition.situation?.lastPlay?.team?.id === competition.competitors[1]?.team?.id) || false}
						showScore={showScore}
						isHome={false}
					/>
					<ScoreSeparator show={showScore} />
					<TeamInfo
						competitor={competition.competitors[0]}
						isPossession={(state === "in" && competition.situation?.lastPlay?.team?.id === competition.competitors[0]?.team?.id) || false}
						showScore={showScore}
						isHome={true}
					/>
				</div>
			</div>
			<div className='pt-1.5 flex gap-1'>
				<EventStatus event={event} />
			</div>
			{state === "in" && competition.situation?.lastPlay && (
				<div className='pt-1.5 flex gap-1 items-center'>
					<IoAmericanFootball className='inline' />
					<span className='font-light text-accent-foreground'>{competition.situation.lastPlay.text}.</span>
				</div>
			)}
		</div>
	);
};

const LoadDisplay = () => {
	return (
		<div className='bg-card text-card-foreground border rounded-lg shadow-sm text-sm p-2'>
			<div className='flex items-center'>
				<Skeleton className='h-4 w-full' />
			</div>
			<div className='pt-1.5 flex gap-1'>
				<Skeleton className='h-8 w-full' />
			</div>
		</div>
	);
};
