/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import TeamLogo from "@/components/team/team-logo";
import { Badge } from "@/components/ui/badge";
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
}

interface Competitor {
	team: {
		id: string;
		displayName: string;
		shortDisplayName: string;
		abbreviation: string;
		name: string;
		color: string;
	};
	score: number;
	winner: boolean;
}

interface Event {
	id: string;
	date: string;
	competitions: {
		competitors: Competitor[];
		situation: {
			lastPlay: {
				team: {
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
		attendance: string;
	}[];
	status: {
		type: {
			state: string;
		};
	};
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
		setRefreshInterval(determineRefreshInterval(payload));

		const interval = setInterval(() => {
			setRefreshInterval(determineRefreshInterval(payload));
		}, 60000);

		return () => clearInterval(interval);
	}, [payload]);

	const prod = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?&groups=80";
	const { data, error } = useSWR(prod, fetcher, {
		refreshInterval,
	});

	if (error) return <div className='text-red-500'>Failed to load event</div>;
	if (!data) return <LoadDisplay />;

	const event = data.events.find((e: any) => e.id === payload.id);

	if (!event) return <div>Event not found</div>;

	return <EventDisplay event={event} />;
}

const TeamInfo = ({ competitor, isPossession, showScore, isHome }: { competitor: Competitor; isPossession: boolean; showScore: boolean; isHome: boolean }) => (
	<div className={`flex items-center flex-1 gap-2 px-1 ${isHome ? "flex-row-reverse items-start" : "items-start"}`}>
		{isPossession && <span className='mx-1 text-yellow-500'>&#9679;</span>}
		<Link
			href={`/teams/${getTeamSlug(parseInt(competitor.team.id))}`}
			className={`flex items-center justify-center text-center flex-col gap-2 group max-w-[1/2]`}>
			<TeamLogo
				id={competitor.team.id}
				alt={competitor.team.displayName}
				width={24}
				height={24}
				className={`inline ${isHome ? "ml-2" : "mr-2"} size-12 md:size-10`}
			/>
			<span className={`hidden lg:block text-lg md:text-lg font-serif font-bold group-hover:underline`}>{competitor.team.displayName}</span>
			<span className={`hidden sm:block lg:hidden text-lg md:text-lg font-serif font-bold group-hover:underline`}>
				{competitor.team.shortDisplayName}
			</span>
			<span className={`sm:hidden text-lg md:text-lg font-serif font-bold group-hover:underline`}>{competitor.team.abbreviation}</span>
		</Link>
		{showScore && (
			<span
				className={`${isHome ? "mr-auto" : "ml-auto"} text-4xl font-mono font-black ${competitor.winner ? "text-green-500" : ""} ${
					isPossession ? "underline" : ""
				}`}>
				{competitor.score}
			</span>
		)}
	</div>
);

const EventStatus = ({ event }: { event: Event }) => {
	const state = event.status.type.state;
	const competition = event.competitions[0];

	/*
	if (state === "post") {
		return (
			<>
				<Badge>Final</Badge>
				<Badge variant='secondary'>{format(parseISO(event.date), "PP")}</Badge>
				<Badge variant='secondary'>
					<MdStadium />
					&nbsp;&nbsp;{parseInt(competition.attendance).toLocaleString()}
				</Badge>
			</>
		);
	} else if (state === "in") {
		return (
			<>
				<Badge variant='outline'>
					{competition.status.displayClock} &sdot; Q{competition.status.period}
				</Badge>

				<Badge variant='outline'>
					{competition.situation.shortDownDistanceText} &sdot; {competition.situation.possessionText}
				</Badge>
			</>
		);
	} else {
		return (
			<>
				<Badge variant='secondary'>{format(parseISO(event.date), "PPp")}</Badge>
				<Badge variant='secondary'>
					{competition.venue.fullName}, {competition.venue.address.state}
				</Badge>
				<Badge variant='secondary'>{competition.broadcasts[0].names}</Badge>
			</>
		);
	} */

	if (state === "post") {
		return (
			<div className='flex flex-col items-center justify-center px-2 gap-2'>
				<Badge>Final</Badge>
				<Badge variant='secondary'>{format(parseISO(event.date), "PP")}</Badge>
			</div>
		);
	} else if (state === "in") {
		return (
			<div className='flex flex-col items-center justify-center px-2 gap-2'>
				<Badge variant='outline'>
					{competition.status.displayClock} &sdot; Q{competition.status.period}
				</Badge>

				<Badge variant='outline'>
					{competition.situation.shortDownDistanceText} &sdot; {competition.situation.possessionText}
				</Badge>
			</div>
		);
	} else {
		return (
			<div className='flex flex-col items-center justify-center px-2 gap-2'>
				<Badge variant='secondary'>{format(parseISO(event.date), "PPp")}</Badge>
				<Badge variant='secondary'>{competition.broadcasts[0].names}</Badge>
			</div>
		);
	}
};

const EventDisplay = ({ event }: { event: Event }) => {
	const competition = event.competitions[0];
	const state = event.status.type.state;
	const showScore = ["in", "post"].includes(state);

	return (
		<div className='bg-card text-card-foreground border rounded-lg shadow-sm text-sm p-2'>
			<div className='flex items-center mb-2'>
				<div className='flex grow justify-between'>
					<TeamInfo
						competitor={competition.competitors[1]}
						isPossession={(state === "in" && competition.situation?.lastPlay?.team?.id === competition.competitors[1]?.team?.id) || false}
						showScore={showScore}
						isHome={false}
					/>
					<EventStatus event={event} />
					<TeamInfo
						competitor={competition.competitors[0]}
						isPossession={(state === "in" && competition.situation?.lastPlay?.team?.id === competition.competitors[0]?.team?.id) || false}
						showScore={showScore}
						isHome={true}
					/>
				</div>
			</div>

			{state === "in" && competition.situation.lastPlay && (
				<div className='pt-1.5 flex gap-1 items-center'>
					<IoAmericanFootball className='inline mr-1' />
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
