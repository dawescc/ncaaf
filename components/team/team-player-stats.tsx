import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

interface TeamPlayerStatsProps {
	team: number;
}

interface Athlete {
	id: string;
	uid: string;
	displayName: string;
	shortName: string;
	position: {
		id: string;
		name: string;
		displayName: string;
		abbreviation: string;
	};
	guid: string;
	links?: { rel: string[]; href: string }[];
	headshot?: { href: string; alt: string };
}

interface Statistic {
	name: string;
	displayName: string;
	abbreviation: string;
	stats: {
		name: string;
		displayName: string;
		shortDisplayName: string;
		description: string;
		abbreviation: string;
		value: number;
		displayValue: string;
		perGameValue?: number;
		perGameDisplayValue?: string;
	}[];
}

interface Leader {
	value: number;
	displayValue: string;
	athlete: Athlete;
	statistics: Statistic[];
}

interface Category {
	name: string;
	displayName: string;
	shortDisplayName: string;
	abbreviation: string;
	leaders: Leader[];
	sort: string;
}

async function fetchTeamPlayerStats(team: number): Promise<Category[]> {
	const response = await fetch(`https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team}/athletes/statistics`);

	if (!response.ok) throw new Error("Failed to fetch data");

	const data = await response.json();
	return data.results;
}

const TeamPlayerStats = async ({ team }: TeamPlayerStatsProps) => {
	try {
		const categories = await fetchTeamPlayerStats(team);

		// Group categories into broader tabs
		const offenseCategories = categories.filter((category) => ["passing", "rushing", "receiving", "scoring"].includes(category.name.toLowerCase()));

		const defenseCategories = categories.filter((category) => ["defensive"].includes(category.name.toLowerCase()));

		const specialTeamsCategories = categories.filter((category) => ["kicking", "punting", "returning"].includes(category.name.toLowerCase()));

		// Function to collect all unique stats for a set of categories
		const collectAllStats = (categories: Category[]) => {
			const allStats = new Set<string>();
			categories.forEach((category) => {
				category.leaders.forEach((leader) => {
					leader.statistics.forEach((statistic) => {
						statistic.stats.forEach((stat) => {
							allStats.add(stat.displayName);
						});
					});
				});
			});
			return Array.from(allStats);
		};

		// Collect all stats for each tab
		const offenseStats = collectAllStats(offenseCategories);
		const defenseStats = collectAllStats(defenseCategories);
		const specialTeamsStats = collectAllStats(specialTeamsCategories);

		// Render tables with consistent columns
		const renderTables = (categories: Category[], allStats: string[]) =>
			categories.map((category) => (
				<Table
					key={category.abbreviation}
					className='mb-8 caption-top'>
					<TableCaption className=''>{category.displayName}</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='text-left'>Rank</TableHead>
							<TableHead>Pos.</TableHead>
							<TableHead>Player</TableHead>
							{allStats.map((stat) => (
								<TableHead
									key={stat}
									className='text-right'>
									{stat}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{category.leaders.map((leader, index) => (
							<TableRow key={leader.athlete.id}>
								<TableCell className='text-left'>{index + 1}</TableCell>
								<TableCell>{leader.athlete.position.abbreviation}</TableCell>
								<TableCell>
									<Link
										href={leader.athlete.links?.find((link) => link.rel.includes("playercard"))?.href || "#"}
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center gap-2 hover:underline'>
										{leader.athlete.headshot ? (
											<Image
												src={leader.athlete.headshot.href}
												alt={leader.athlete.headshot.alt}
												width={20}
												height={20}
												className='rounded-full'
											/>
										) : (
											<div className='w-5 h-5 bg-gray-200 rounded-full' />
										)}
										{leader.athlete.displayName}
									</Link>
								</TableCell>
								{allStats.map((stat) => {
									const statValue =
										leader.statistics.flatMap((statistic) => statistic.stats).find((s) => s.displayName === stat)?.displayValue || "-";
									return (
										<TableCell
											key={stat}
											className='text-right'>
											{statValue}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			));

		return (
			<Tabs
				defaultValue='offense'
				className='w-full'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='offense'>Offense</TabsTrigger>
					<TabsTrigger value='defense'>Defense</TabsTrigger>
					<TabsTrigger value='special-teams'>Special Teams</TabsTrigger>
				</TabsList>

				<TabsContent value='offense'>{renderTables(offenseCategories, offenseStats)}</TabsContent>

				<TabsContent value='defense'>{renderTables(defenseCategories, defenseStats)}</TabsContent>

				<TabsContent value='special-teams'>{renderTables(specialTeamsCategories, specialTeamsStats)}</TabsContent>
			</Tabs>
		);
	} catch (error) {
		console.error("Failed to fetch player stats:", error);
		return <div>Failed to load player stats. Please try again later.</div>;
	}
};

export default TeamPlayerStats;
