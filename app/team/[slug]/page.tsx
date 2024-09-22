import Image from "next/image";
import TeamSchedule from "@/components/teamSchedule";
import { conferences, teams } from "@/data/teams";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string } }) {
	const res = await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${params.slug}/`);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.statusText}`);
	}
	const data = await res.json();
	const team = data.team;
	const color = `#${team.color}`;
	const altColor = `#${team.alternateColor || "ffffff"}`;

	// Get theme preference from cookie
	const cookieStore = cookies();
	const themeCookie = cookieStore.get("theme");
	const isDarkMode = themeCookie?.value === "dark";

	// Choose the appropriate logo
	const logoUrl = isDarkMode && team.logos.length > 1 ? team.logos[1].href : team.logos[0].href;

	// Find team in our local data
	const localTeamData = Object.values(teams).find((t) => t.id === params.slug);

	// Get conference info from our local data
	const conferenceId = localTeamData?.conference;
	const conferenceInfo = conferenceId ? conferences[conferenceId] : null;
	const conferenceName = conferenceInfo ? conferenceInfo.short : "Independent";

	// Extract position from standingSummary
	const positionMatch = team.standingSummary.match(/(\d+)[a-z]{2}/);
	const position = positionMatch ? positionMatch[1] : "";

	// Combine conference and position
	const conferenceDisplay = `${conferenceName} (${position}${getOrdinalSuffix(parseInt(position))})`;

	// Get rank
	const rank = team.rank;

	return (
		<div className='flex flex-col gap-8 max-w-4xl mx-auto'>
			<div className='overflow-hidden'>
				<div
					className='p-6 flex items-center'
					style={{ borderBottom: `4px solid ${color}` }}>
					<Image
						src={logoUrl}
						alt={`${team.displayName} logo`}
						height={80}
						width={80}
					/>
					<div className='ml-6'>
						<h1
							className='text-3xl font-bold mb-1'
							style={{ color }}>
							{rank ? `#${rank} ` : ""}
							{team.displayName}
						</h1>
						<p className='mb-1'>{conferenceDisplay}</p>
						<p className='text-sm text-gray-500 dark:text-gray-400'>{team.record.items[0].summary}</p>
					</div>
				</div>
			</div>
			<TeamSchedule teamid={team.id as string} />
		</div>
	);
}

// Helper function to get ordinal suffix
function getOrdinalSuffix(n: number): string {
	const s = ["th", "st", "nd", "rd"];
	const v = n % 100;
	return s[(v - 20) % 10] || s[v] || s[0];
}
