import { teams } from "@/data/teams";
import TeamsList from "@/components/teamsList";
import { FaSearch } from "react-icons/fa";

export default async function TeamsPage({ searchParams }: { searchParams: { q?: string } }) {
	const searchQuery = searchParams.q || "";
	const filteredTeams = Object.values(teams).filter((team) => team.slug.toLowerCase().includes(searchQuery.toLowerCase()));
	const filteredTeamIds = filteredTeams.map((team) => parseInt(team.id));

	return (
		<div className='px-10 pb-20 pt-10 flex flex-col space-y-4'>
			<h1 className='font-bold text-3xl font-serif'>Teams</h1>
			<form
				method='get'
				className='flex mb-4 border rounded-lg p-1 focus-within::ring-2 focus-within:ring-blue-500'>
				<input
					type='text'
					name='q'
					placeholder='Search teams...'
					defaultValue={searchQuery}
					className='w-full px-4 py-2  focus:outline-none'
				/>
				<button
					type='submit'
					className='bg-white text-blue-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
					<FaSearch />
				</button>
			</form>
			<TeamsList teamIds={filteredTeamIds.length > 0 ? filteredTeamIds : Object.values(teams).map((team) => parseInt(team.id))} />
		</div>
	);
}
