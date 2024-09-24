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
	const response = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/teams/${teamId}`);
	if (!response.ok) {
		throw new Error("Failed to fetch team statistics");
	}
	const data = await response.json();
	const statisticsUrl = data.statistics.$ref;
	const statsResponse = await fetch(statisticsUrl);
	if (!statsResponse.ok) {
		throw new Error("Failed to fetch statistics data");
	}
	const statisticsData: StatisticsData = await statsResponse.json();

	return statisticsData.splits.categories;
};

const TeamStats = async ({ teamId }: TeamStatsProps) => {
	const categories = await fetchTeamStatistics(teamId);

	return (
		<div className='overflow-x-auto border-gray-200/50 border-[1px] shadow-sm rounded-lg'>
			<table className='w-full min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Stat</th>
						<th className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6'>Value</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{categories.map((category, catIndex) => (
						<>
							<tr
								key={catIndex}
								className='bg-gray-100'>
								<td
									colSpan={2}
									className='px-2 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider sm:px-6'>
									{category.name}
								</td>
							</tr>
							{category.stats.map((stat, statIndex) => (
								<tr key={statIndex}>
									<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{stat.displayName}</td>
									<td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6'>{stat.displayValue}</td>
								</tr>
							))}
						</>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TeamStats;
