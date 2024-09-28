import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ClientTime from "@/components/clientTime";
import { ScoreBoardEvent } from "@/lib/types";
import Link from "next/link";

type PreGameCardProps = {
	event: ScoreBoardEvent;
};

export default function PreGameCard({ event }: PreGameCardProps) {
	const { competitions, date } = event;
	const [competition] = competitions;
	const { competitors, broadcasts } = competition;

	const homeTeam = competitors.find((team) => team.homeAway === "home");
	const awayTeam = competitors.find((team) => team.homeAway === "away");
	const broadcast = broadcasts?.[0]?.names.join("/") || "";

	if (!homeTeam || !awayTeam) {
		return null; // or some error state
	}

	return (
		<Card className='overflow-hidden bg-accent'>
			<CardContent className='p-4'>
				<div className='flex flex-col space-y-2'>
					<div className='flex justify-between items-center text-sm'>
						<ClientTime utcDate={date} />
						<span>{broadcast}</span>
					</div>
					<div className='flex justify-between items-center'>
						<PreGameTeamDisplay team={awayTeam} />
						<PreGameTeamDisplay team={homeTeam} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

type TeamDisplayProps = {
	team: ScoreBoardEvent["competitions"][0]["competitors"][0];
};

const PreGameTeamDisplay = ({ team }: TeamDisplayProps) => (
	<div>
		<Link
			href={`${team.id}`}
			className='flex items-center gap-x-2'>
			<Image
				src={team.team.logo}
				alt={team.team.displayName}
				width={40}
				height={40}
			/>
			<div>
				<div className='text-sm font-medium'>
					{team.curatedRank.current !== 99 && <span className='text-xs'>{team.curatedRank.current}&nbsp;</span>}
					<span className='font-bold'>{team.team.shortDisplayName}</span>
				</div>
				<div className='text-xs'>{team.records[0].summary}</div>
			</div>
		</Link>
	</div>
);
