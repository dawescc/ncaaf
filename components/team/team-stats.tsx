import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TeamStatisticsProps {
	team: number;
}

interface Stat {
	name: string;
	displayName: string;
	abbreviation: string;
	displayValue: string;
	perGameDisplayValue?: string;
	rankDisplayValue?: string;
	description: string;
}

interface Category {
	name: string;
	displayName: string;
	abbreviation: string;
	stats: Stat[];
}

async function fetchTeamStatistics(team: number): Promise<{ categories: Category[]; opponent: Category[] }> {
	const response = await fetch(`https://site.web.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team}/statistics`);

	if (!response.ok) throw new Error("Failed to fetch data");

	const data = await response.json();
	return {
		categories: data.results.stats.categories,
		opponent: data.results.opponent,
	};
}

const TeamStats = async ({ team }: TeamStatisticsProps) => {
	try {
		const { categories, opponent } = await fetchTeamStatistics(team);

		// Define categories for offense and defense
		const offenseCategories = categories.filter((category) => ["passing", "rushing", "receiving"].includes(category.name.toLowerCase()));

		const defenseCategories = opponent.filter((category) => ["passing", "rushing", "receiving"].includes(category.name.toLowerCase()));

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
							<TableCaption className=''>{category.displayName} Statistics</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='text-left'>Stat</TableHead>
									<TableHead className='text-right'>Value</TableHead>
									<TableHead className='text-right'>Per Game</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{category.stats.map((stat) => (
									<TableRow key={stat.name}>
										<TableCell className='text-left'>{stat.displayName}</TableCell>
										<TableCell className='text-right'>{stat.displayValue}</TableCell>
										<TableCell className='text-right'>{stat.perGameDisplayValue || "N/A"}</TableCell>
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
							<TableCaption className=''>{category.displayName} Statistics</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='text-left'>Stat</TableHead>
									<TableHead className='text-right'>Value</TableHead>
									<TableHead className='text-right'>Rank</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{category.stats.map((stat) => (
									<TableRow key={stat.name}>
										<TableCell className='text-left'>{stat.displayName}</TableCell>
										<TableCell className='text-right'>{stat.displayValue}</TableCell>
										<TableCell className='text-right'>{stat.rankDisplayValue || "N/A"}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					))}
				</TabsContent>
			</Tabs>
		);
	} catch (error) {
		console.error("Failed to fetch team statistics:", error);
		return <div>Failed to load team statistics. Please try again later.</div>;
	}
};

export default TeamStats;
