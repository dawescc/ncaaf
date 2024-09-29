import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ScoreBoardEvent } from "@/lib/types";
import TeamLogo from "@/components/team/teamLogo";

type PostGameCardProps = {
	event: ScoreBoardEvent;
};

export default function PostGameCard({ event }: PostGameCardProps) {
	const { competitions, links } = event;
	const [competition] = competitions;
	const { competitors } = competition;

	const homeTeam = competitors.find((team) => team.homeAway === "home");
	const awayTeam = competitors.find((team) => team.homeAway === "away");

	const timeDisplay = event.status.type.shortDetail;
	const boxscoreLink = links.find((link) => link.text === "Box Score");

	if (!homeTeam || !awayTeam) {
		return null; // or some error state
	}

	return (
		<Card className='overflow-hidden'>
			<CardContent className='p-4'>
				<div className='flex flex-col space-y-4'>
					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>{timeDisplay}</span>
						{boxscoreLink && (
							<Link
								href={boxscoreLink.href}
								className='hover:underline'>
								Boxscore
							</Link>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<PostGameTeamDisplay team={awayTeam} />
						<PostGameTeamDisplay team={homeTeam} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

type TeamDisplayProps = {
	team: ScoreBoardEvent["competitions"][0]["competitors"][0];
};

const PostGameTeamDisplay = ({ team }: TeamDisplayProps) => {
	const teamWon = team.winner;

	return (
		<div className='flex items-center gap-2'>
			<TeamLogo
				teamId={parseInt(team.team.id)}
				width={40}
				height={40}
			/>
			<div>
				<Link
					href={`/teams/${team.team.id}`}
					className='text-lg font-bold flex items-center gap-x-2'>
					{team.curatedRank.current !== 99 && <span className='text-sm font-normal'>{team.curatedRank.current}&nbsp;</span>}
					<span className={teamWon ? "text-green-500" : ""}>{team.team.shortDisplayName}</span>
				</Link>
				<div className='text-sm'>{team.records[0].summary}</div>
			</div>
			<div className={`text-3xl font-bold ml-auto ${teamWon ? "text-green-500" : ""}`}>{team.score}</div>
		</div>
	);
};
