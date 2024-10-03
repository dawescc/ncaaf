import Link from "next/link";
import { teams } from "@/data/teams";
import TeamLogo from "@/components/team/team-logo";
import { cn } from "@/lib/utils";

export interface Props {
	logo_s?: number;
}

const TeamsList = ({ logo_s }: Props) => {
	const sortedTeams = Object.values(teams).sort((a, b) => a.shortDisplayName.localeCompare(b.shortDisplayName));

	return (
		<div className='w-full text-sm'>
			<div className={cn("pb-4")}>
				<h3 className='mb-1 rounded-md px-2 py-1 font-black'>Teams</h3>
				{sortedTeams.map((team) => (
					<Link
						key={team.id}
						href={`/teams/${team.slug}`}
						className='group flex w-full items-center px-2 py-1.5 hover:underline text-muted-foreground'>
						<TeamLogo
							id={team.id}
							width={logo_s || 20}
							height={logo_s || 20}
							className='mr-4'
							alt={`${team.displayName} logo`}
						/>
						<span className='font-medium'>
							{team.shortDisplayName} {team.name}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TeamsList;
