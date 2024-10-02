import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { teams } from "@/data/teams";
import TeamLogo from "@/components/team/team-logo";

const TeamsList = () => {
	const sortedTeams = Object.values(teams).sort((a, b) => a.shortDisplayName.localeCompare(b.shortDisplayName));

	return (
		<Table className='font-mono'>
			<TableHeader>
				<TableRow>
					<TableHead>FBS Division I Teams</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedTeams.map((team) => (
					<TableRow key={team.id}>
						<TableCell>
							<Link
								href={`/teams/${team.slug}`}
								className='flex items-center'>
								<TeamLogo
									id={team.id}
									width={32}
									height={32}
									className='mr-4'
									alt={`${team.displayName} logo`}
								/>
								<span className='font-medium'>
									{team.shortDisplayName} {team.name}
								</span>
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TeamsList;
