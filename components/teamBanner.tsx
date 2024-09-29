import TeamLogo from "./team/teamLogo";

type TeamBannerProps = {
	teamId: number;
};

type TeamData = {
	displayName: string;
	logos: { href: string }[];
	record: {
		items: {
			description: string;
			summary: string;
		}[];
	};
	standingSummary: string;
	rank?: number;
	color: string;
};

const fetchTeamData = async (teamId: number): Promise<TeamData> => {
	const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${teamId}`);
	if (!response.ok) {
		throw new Error("Failed to fetch team data");
	}
	const data = await response.json();
	const teamData = {
		displayName: data.team.displayName,
		logos: data.team.logos,
		record: data.team.record,
		standingSummary: data.team.standingSummary,
		rank: data.team.rank,
		color: data.team.color,
	};
	return teamData;
};

const TeamBanner = async ({ teamId }: TeamBannerProps) => {
	try {
		const teamData = await fetchTeamData(teamId);
		const overallRecord = teamData.record.items.find((item) => item.description === "Overall Record")?.summary || "N/A";

		return (
			<div
				className={`border-b-4`}
				style={{ borderColor: `#${teamData.color}` }}>
				<div className='flex items-center space-x-4 p-4'>
					<TeamLogo
						teamId={teamId}
						height={64}
						width={64}
					/>
					<div>
						<h1 className='text-3xl font-bold'>
							{teamData.rank !== undefined && <span className='text-lg font-medium'>{teamData.rank}</span>} {teamData.displayName}
						</h1>

						<p className='text-lg'>
							{overallRecord} &#8901; ({teamData.standingSummary})
						</p>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error(error);
		return <div>Error loading team data</div>;
	}
};

export default TeamBanner;
