import TeamSchedule from "@/components/teamSchedule";
import { conferences, teams } from "@/data/teams";
import { cookies } from "next/headers";
import TeamDetail from "@/components/teamDetail";

export default async function Page({ params }: { params: { slug: string } }) {
	const res = await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${params.slug}/`);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.statusText}`);
	}
	const data = await res.json();
	const team = data.team;

	// Get theme preference from cookie
	const cookieStore = cookies();
	const themeCookie = cookieStore.get("theme");
	const isDarkMode = themeCookie?.value === "dark";

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

	return (
		<div className='flex flex-col gap-8 max-w-4xl mx-auto'>
			<TeamDetail
				team={team}
				isDarkMode={isDarkMode}
				conferenceDisplay={conferenceDisplay}
				conferenceId={conferenceId || ""}
			/>
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
