import TeamButton from "@/components/teamButton";
import { teams } from "@/data/teams";

export default async function Home() {
	return (
		<div className=''>
			<main className='px-2 py-4'>
				<div className='flex flex-col space-y-3 max-w-xl mx-auto'>
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
