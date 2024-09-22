import TeamButton from "@/components/teamButton";
import { teams } from "@/data/teams";

export default async function Home() {
	return (
		<div className=''>
			<main className='px-2 py-4 max-w-3xl mx-auto'>
				<div className='grid grid-cols-2 gap-3'>
					{Object.values(teams).map((team) => (
						<TeamButton
							key={team.id}
							id={team.id}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
