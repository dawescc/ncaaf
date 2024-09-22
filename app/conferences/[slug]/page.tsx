import { teams } from "@/data/teams";
import TeamButton from "@/components/teamButton";

interface Team {
	School: string;
}

export default async function ConferencePage({ params }: { params: { slug: string } }) {
	const res = await fetch(`https://ncaa-api.henrygd.me/standings/football/fbs/${params.slug}`);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.statusText}`);
	}
	const data = await res.json();

	const conferenceStandings = data.data[0].standings;
	const conferenceName = data.title;

	return (
		<div className=''>
			<main className='px-2 py-4'>
				<h1 className='text-3xl font-bold text-center'>{conferenceName}</h1>
				<div className='flex flex-col space-y-3 max-w-xl mx-auto'>
					{conferenceStandings.map((team: Team) => {
						const schoolName = team.School.toLowerCase();
						const teamInfo = Object.values(teams).find((t) => t.slug.toLowerCase().includes(schoolName) && t.conference === params.slug);

						console.log("Team:", team.School, "Team Info:", teamInfo);

						if (!teamInfo) return null;
						return (
							<TeamButton
								key={teamInfo.id}
								id={teamInfo.id}
							/>
						);
					})}
				</div>
			</main>
		</div>
	);
}
