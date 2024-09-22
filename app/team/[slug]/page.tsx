import Image from "next/image";
import TeamSchedule from "@/components/teamSchedule";

export default async function Page({ params }: { params: { slug: string } }) {
	const res = await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${params.slug}/`);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.statusText}`);
	}
	const data = await res.json();
	const team = data.team;
	const color = `#${team.color}`;

	return (
		<div className='flex flex-col gap-8'>
			<Image
				src={team.logos[0].href}
				alt={`${team.displayName} logo`}
				height={100}
				width={100}
			/>
			<h1 style={{ color }}>{team.displayName}</h1>
			<p>{team.record.items[0].summary}</p>
			<TeamSchedule teamid={team.id as string} />
		</div>
	);
}
