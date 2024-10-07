import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TeamLogo from "@/components/team/team-logo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface GroupTeamStatsProps {
	group?: number;
}

interface TeamLeader {
	displayValue: string;
	value: number;
	ranks: string;
	team: {
		slug: string;
		id: string;
		logos: { href: string }[];
		abbreviation: string;
		displayName: string;
		links: { href: string }[];
	};
}

interface Category {
	abbreviation: string;
	displayName: string;
	leaders: TeamLeader[];
}

async function fetchGroupTeamStats(group: number): Promise<Category[]> {
	const response = await fetch(
		`https://site.web.api.espn.com/apis/site/v3/sports/football/college-football/teamleaders?group=${group}&sort=opponent-totalPointsPerGame%3Aasc%2Copponent-yardsPerGame%3Aasc`,
		{ next: { revalidate: 28800 } } // Revalidate every 8 hours
	);

	if (!response.ok) throw new Error("Failed to fetch data");

	const data = await response.json();
	return data.teamLeaders.categories;
}

const GroupTeamStats = async ({ group = 80 }: GroupTeamStatsProps) => {
	try {
		const categories = await fetchGroupTeamStats(group);

		// Filter categories for Offense and Defense
		const offenseCategories = categories.filter((category) =>
			["yards per game", "passing yards per game", "rushing yards per game"].includes(category.displayName.toLowerCase())
		);

		const defenseCategories = categories
			.filter((category) => category.displayName.toLowerCase().startsWith("opponent-"))
			.map((category) => {
				let displayName = category.displayName
					.replace("opponent-", "")
					.replace(/([A-Z])/g, " $1")
					.trim();
				if (displayName.toLowerCase().includes("sacks")) {
					displayName = "Sacks per Game";
				} else if (displayName.toLowerCase().includes("yards")) {
					displayName = "Yards Allowed per Game";
				} else if (displayName.toLowerCase().includes("points")) {
					displayName = "Points Allowed per Game";
				}
				return {
					...category,
					displayName,
				};
			});

		return (
			<Tabs
				defaultValue='offense'
				className='w-full'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='offense'>Offense</TabsTrigger>
					<TabsTrigger value='defense'>Defense</TabsTrigger>
				</TabsList>

				<TabsContent value='offense'>
					{offenseCategories.map((category) => (
						<Table
							key={category.abbreviation}
							className='mb-8 caption-top'>
							<TableCaption className=''>{category.displayName}</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='text-left'>Nat&apos;l Rank</TableHead>
									<TableHead>Team</TableHead>
									<TableHead className='text-right'>Stat</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{category.leaders.map((leader) => (
									<TableRow key={leader.team.id}>
										<TableCell className='text-left'>{leader.ranks}</TableCell>
										<TableCell>
											<Link
												href={`/teams/${leader.team.slug}`}
												rel='noopener noreferrer'
												className='flex items-center gap-2 hover:underline'>
												<TeamLogo
													id={leader.team.id}
													alt={leader.team.displayName}
													width={20}
													height={20}
												/>
												{leader.team.displayName}
											</Link>
										</TableCell>
										<TableCell className='text-right'>{leader.displayValue}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					))}
				</TabsContent>

				<TabsContent value='defense'>
					{defenseCategories.map((category) => (
						<Table
							key={category.abbreviation}
							className='mb-8 caption-top'>
							<TableCaption className=''>{category.displayName}</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='text-left'>Nat&apos;l Rank</TableHead>
									<TableHead>Team</TableHead>
									<TableHead className='text-right'>Stat</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{category.leaders.map((leader) => (
									<TableRow key={leader.team.id}>
										<TableCell className='text-left'>{leader.ranks}</TableCell>
										<TableCell>
											<Link
												href={`/teams/${leader.team.slug}`}
												rel='noopener noreferrer'
												className='flex items-center gap-2 hover:underline'>
												<TeamLogo
													id={leader.team.id}
													alt={leader.team.displayName}
													width={20}
													height={20}
												/>
												{leader.team.displayName}
											</Link>
										</TableCell>
										<TableCell className='text-right'>{leader.displayValue}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					))}
				</TabsContent>
			</Tabs>
		);
	} catch (error) {
		console.error("Failed to fetch team stats:", error);
		return <div>Failed to load team stats. Please try again later.</div>;
	}
};

export default GroupTeamStats;
