import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TeamStatsProps = {
	teamId: number;
};

type Statistic = {
	displayName: string;
	displayValue: string;
};

type Category = {
	name: string;
	stats: Statistic[];
};

type StatisticsData = {
	splits: {
		categories: Category[];
	};
};

const fetchTeamStatistics = async (teamId: number): Promise<Category[]> => {
	const response = await fetch(
		`https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/2024/types/2/teams/${teamId}/statistics/0`
	);
	if (!response.ok) {
		throw new Error(`Failed to fetch statistics data: ${response.statusText}`);
	}
	const statisticsData: StatisticsData = await response.json();

	if (!statisticsData.splits || !statisticsData.splits.categories) {
		throw new Error("Categories not found in statistics data");
	}

	return statisticsData.splits.categories;
};

const StatTable = ({ categories, tabName }: { categories: Category[]; tabName: string }) => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Statistic</TableHead>
				<TableHead className='text-right'>Value</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{categories.map((category, categoryIndex) => (
				<React.Fragment key={categoryIndex}>
					{category.name !== "defensive" &&
						category.name !== "defensiveInterceptions" &&
						category.name !== "miscellaneous" &&
						tabName !== "Scoring" && (
							<TableRow>
								<TableHead
									colSpan={2}
									className='bg-muted capitalize'>
									{category.name === "general" ? "Miscellaneous" : category.name}
								</TableHead>
							</TableRow>
						)}
					{category.stats.map((stat, statIndex) => (
						<TableRow key={`${categoryIndex}-${statIndex}`}>
							<TableCell className='font-medium'>{stat.displayName}</TableCell>
							<TableCell className='text-right'>{stat.displayValue}</TableCell>
						</TableRow>
					))}
				</React.Fragment>
			))}
		</TableBody>
	</Table>
);

const TeamStats = async ({ teamId }: TeamStatsProps) => {
	try {
		const categories = await fetchTeamStatistics(teamId);

		if (categories.length === 0) {
			return <div>No statistics available for this team.</div>;
		}

		const combinedCategories = {
			General: [categories.find((c) => c.name === "miscellaneous"), categories.find((c) => c.name === "general")].filter(
				(c): c is Category => c !== undefined
			),
			Offense: [
				categories.find((c) => c.name === "passing"),
				categories.find((c) => c.name === "rushing"),
				categories.find((c) => c.name === "receiving"),
			].filter((c): c is Category => c !== undefined),
			Defense: [categories.find((c) => c.name === "defensive"), categories.find((c) => c.name === "defensiveInterceptions")].filter(
				(c): c is Category => c !== undefined
			),
			"Sp. Teams": [
				categories.find((c) => c.name === "kicking"),
				categories.find((c) => c.name === "returning"),
				categories.find((c) => c.name === "punting"),
			].filter((c): c is Category => c !== undefined),
			Scoring: [categories.find((c) => c.name === "scoring")].filter((c): c is Category => c !== undefined),
		};

		return (
			<Tabs defaultValue='General'>
				<TabsList className='overflow-x-auto w-full'>
					{Object.keys(combinedCategories).map((tabName, index) => (
						<TabsTrigger
							key={index}
							value={tabName}
							className='capitalize'>
							{tabName}
						</TabsTrigger>
					))}
				</TabsList>
				{Object.entries(combinedCategories).map(([tabName, tabCategories], index) => (
					<TabsContent
						key={index}
						value={tabName}>
						<StatTable
							categories={tabCategories}
							tabName={tabName}
						/>
					</TabsContent>
				))}
			</Tabs>
		);
	} catch (error) {
		console.error("Error fetching team statistics:", error);
		return <div>Error loading team statistics. Please try again later.</div>;
	}
};

export default TeamStats;
