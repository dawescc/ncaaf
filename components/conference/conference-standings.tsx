import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";
import { getConferenceStandings, getTeamInfo } from "@/actions/actions";
import TeamLogo from "@/components/team/team-logo";

type Record = {
	wins: number;
	losses: number;
	streak: string;
	conferenceWins: number;
	conferenceLosses: number;
};

type Standing = {
	team: {
		id: string;
		name: string;
		logo: string;
		slug: string;
	};
	record: Record;
};

const ConfStandings = async ({ conf_id }: { conf_id: number }) => {
	const apiStandings = await getConferenceStandings(conf_id);

	const standings: Standing[] = await Promise.all(
		apiStandings.map(async (entry) => {
			const teamInfo = await getTeamInfo(parseInt(entry.team.id));

			const overallRecord = entry.stats.find((stat) => stat.name === "overall");
			const conferenceRecord = entry.stats.find((stat) => stat.name === "vs. Conf.");
			const streakStat = entry.stats.find((stat) => stat.name === "streak");

			const record: Record = {
				wins: parseInt(overallRecord?.displayValue.split("-")[0] || "0"),
				losses: parseInt(overallRecord?.displayValue.split("-")[1] || "0"),
				streak: streakStat?.displayValue || "",
				conferenceWins: parseInt(conferenceRecord?.displayValue.split("-")[0] || "0"),
				conferenceLosses: parseInt(conferenceRecord?.displayValue.split("-")[1] || "0"),
			};

			return {
				team: {
					id: entry.team.id,
					name: teamInfo.displayName,
					logo: teamInfo.logos[0]?.href || "",
					slug: teamInfo.slug,
				},
				record,
			};
		})
	);

	return (
		<Table>
			<TableTitle>Conference Standings</TableTitle>
			<TableHeader>
				<TableRow>
					<TableHead className='p-2 md:p-4'>Team</TableHead>
					<TableHead>W</TableHead>
					<TableHead>L</TableHead>
					<TableHead>Conf</TableHead>
					<TableHead className='text-right p-2 md:p-4'>Streak</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{standings.map((standing) => (
					<TableRow key={standing.team.id}>
						<TableCell className='p-2 md:p-4'>
							<Link
								href={`/teams/${standing.team.slug}`}
								className='flex items-center'>
								<TeamLogo
									id={standing.team.id}
									width={32}
									height={32}
									className='mr-4'
									alt=''
								/>
								<span className='font-medium'>{standing.team.name}</span>
							</Link>
						</TableCell>
						<TableCell>{standing.record.wins}</TableCell>
						<TableCell>{standing.record.losses}</TableCell>
						<TableCell>{`${standing.record.conferenceWins}-${standing.record.conferenceLosses}`}</TableCell>
						<TableCell className='text-right p-2 md:p-4'>{standing.record.streak}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ConfStandings;
