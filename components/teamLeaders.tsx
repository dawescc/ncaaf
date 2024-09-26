// components/TeamLeaders.tsx

import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";
import { getTeamLeaders, getAthleteInfo } from "@/lib/actions";
import { Athlete } from "@/lib/types";

type LeaderData = {
	category: string;
	displayValue: string;
	athlete: Athlete;
};

const fetchTeamLeaders = async (teamId: number): Promise<LeaderData[]> => {
	const leadersData = await getTeamLeaders(teamId);
	const categories = ["passingYards", "rushingYards", "receivingYards"];

	const leaderPromises = categories.map(async (category) => {
		const categoryData = leadersData.categories.find((cat) => cat.name === category);
		if (!categoryData || categoryData.leaders.length === 0) return null;

		const leader = categoryData.leaders[0];
		const athleteId = parseInt(leader.athlete.$ref.split("/").pop() || "");
		const athlete = await getAthleteInfo(athleteId);

		return {
			category: categoryData.displayName,
			displayValue: leader.displayValue,
			athlete: athlete,
		};
	});

	const leaders = await Promise.all(leaderPromises);
	return leaders.filter((leader): leader is LeaderData => leader !== null);
};

const TeamLeaders = async ({ teamId }: { teamId: number }) => {
	const leaders = await fetchTeamLeaders(teamId);

	return (
		<Table>
			<TableTitle>Team Leaders</TableTitle>
			<TableCaption>Statistical leaders for the team</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='p-2 md:p-4'>Category</TableHead>
					<TableHead className='p-2 md:p-4'>Player</TableHead>
					<TableHead className='text-right p-2 md:p-4'>Yds.</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{leaders.map((leader) => (
					<TableRow key={leader.category}>
						<TableCell className='p-2 md:p-4'>{leader.category}</TableCell>
						<TableCell className='p-2 md:p-4'>
							<Link
								href={`/players/${leader.athlete.id}`}
								className='flex items-center'>
								<Image
									src={leader.athlete.headshot.href}
									alt={leader.athlete.displayName}
									width={32}
									height={32}
									className='mr-4 rounded-full'
								/>
								<span className='font-medium'>{leader.athlete.displayName}</span>
							</Link>
						</TableCell>
						<TableCell className='text-right p-2 md:p-4'>{leader.displayValue}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TeamLeaders;
