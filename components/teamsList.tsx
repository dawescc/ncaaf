import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";
import { teams, conferences } from "@/data/teams";

type TeamData = {
	id: number;
	displayName: string;
	logos: { href: string }[];
	slug: string;
};

const fetchTeamData = async (teamId: string): Promise<TeamData> => {
	const teamResponse = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/2024/teams/${teamId}`);
	return await teamResponse.json();
};

const TeamsList = async () => {
	const teamPromises = Object.values(teams).map((team) => fetchTeamData(team.id));
	const teamData = await Promise.all(teamPromises);

	return (
		<Table>
			<TableTitle>Teams</TableTitle>
			<TableHeader>
				<TableRow>
					<TableHead>FBS Division I Teams</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teamData.map((team) => {
					const localTeamData = Object.values(teams).find((t) => t.id === team.id.toString());
					const conference = localTeamData
						? conferences[Object.keys(conferences).find((key) => conferences[key].id === localTeamData.conference) || ""]
						: undefined;

					return (
						<TableRow key={team.id}>
							<TableCell>
								<Link
									href={`/teams/${team.slug}`}
									className='flex items-center'>
									<Image
										src={team.logos[0]?.href || conference?.href || ""}
										alt={`${team.displayName} logo`}
										width={32}
										height={32}
										className='mr-4'
									/>
									<span className='font-medium'>{team.displayName}</span>
								</Link>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TeamsList;
