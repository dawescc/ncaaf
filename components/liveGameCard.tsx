"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ScoreBoardEvent } from "@/lib/types";
import { FaFootballBall } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getScoreBoard } from "@/lib/actions";

type LiveGameCardProps = {
	event: ScoreBoardEvent;
};

export default function LiveGameCard({ event: initialEvent }: LiveGameCardProps) {
	const [event, setEvent] = useState(initialEvent);

	useEffect(() => {
		const updateGame = async () => {
			const allEvents = await getScoreBoard();
			const updatedEvent = allEvents.find((e) => e.id === initialEvent.id);
			if (updatedEvent) {
				setEvent(updatedEvent);
			}
		};

		const intervalId = setInterval(updateGame, 10000); // Update every 10 seconds

		return () => clearInterval(intervalId);
	}, [initialEvent.id]);

	const { competitions, status } = event;
	const [competition] = competitions;
	const { competitors, broadcasts, situation } = competition;

	const homeTeam = competitors.find((team) => team.homeAway === "home");
	const awayTeam = competitors.find((team) => team.homeAway === "away");
	const broadcast = broadcasts?.[0]?.names.join("/") || "";

	const timeDisplay = `Q${status.period} ⋅ ${status.displayClock}`;

	const downDistance = `${situation?.shortDownDistanceText} ⋅ ${situation?.possessionText}`;

	const lastPlay = `${situation?.lastPlay?.text}`;

	if (!homeTeam || !awayTeam) {
		return null;
	}

	const possessionTeamId = situation?.lastPlay?.team?.id;

	return (
		<Card className='overflow-hidden'>
			<CardContent className='p-4'>
				<div className='flex flex-col space-y-4'>
					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>{timeDisplay}</span>
						<span>{situation?.shortDownDistanceText ? downDistance : broadcast}</span>
					</div>
					<div className='flex flex-col gap-2'>
						<LiveTeamDisplay
							team={awayTeam}
							hasPossession={possessionTeamId === awayTeam.id}
						/>
						<LiveTeamDisplay
							team={homeTeam}
							hasPossession={possessionTeamId === homeTeam.id}
						/>
					</div>
					{situation?.lastPlay ? <div className='px-1 py-2 border-t-[1px] text-pretty text-xs'>{lastPlay}</div> : null}
				</div>
			</CardContent>
		</Card>
	);
}

type TeamDisplayProps = {
	team: ScoreBoardEvent["competitions"][0]["competitors"][0];
	hasPossession: boolean;
};

const LiveTeamDisplay = ({ team, hasPossession }: TeamDisplayProps) => {
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
					href={`/teams/${team.id}`}
					className='text-lg font-bold flex items-center space-x-2'>
					{team.curatedRank.current !== 99 && <span className='text-sm font-normal'>{team.curatedRank.current}</span>}
					<span>{team.team.shortDisplayName}</span>
					{hasPossession && (
						<FaFootballBall
							className='football-color'
							style={
								{
									["--football-color" as string]: "#" + team.team.color,
									["--dark-football-color" as string]: "#" + team.team.alternateColor,
								} as React.CSSProperties
							}
						/>
					)}
				</Link>
				<div className='text-sm'>{team.records[0].summary}</div>
			</div>
			<div className='text-3xl font-bold ml-auto'>{team.score}</div>
		</div>
	);
};
