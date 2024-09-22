import Image from "next/image";

interface SearchResultsProps {
	searchTerm: string;
	teams: Record<string, any>;
	conferences: Record<string, any>;
}

function formatName(name: string): string {
	return name
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export default function SearchResult({ searchTerm, teams, conferences }: SearchResultsProps) {
	const filteredTeams = Object.values(teams).filter((team) => team.slug.toLowerCase().includes(searchTerm.toLowerCase()));

	const filteredConferences = Object.values(conferences).filter((conference) =>
		[conference.short, conference.full, conference.id].some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	if (!searchTerm) {
		return null;
	}

	return (
		<div className='flex flex-col space-y-2 p-2 max-h-60 overflow-y-auto'>
			{filteredTeams.map((team) => (
				<div
					key={team.id}
					className='flex items-center p-2'>
					<Image
						src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${team.id}.png`}
						alt={`${team.slug} logo`}
						height={50}
						width={50}
						className='size-10 mr-2'
					/>
					<span className='text-sm font-medium capitalize'>{formatName(team.slug)}</span>
				</div>
			))}
			{filteredConferences.map((conference) => (
				<div
					key={conference.id}
					className='flex items-center p-2'>
					<Image
						src={conference.href}
						alt={`${conference.full} logo`}
						height={50}
						width={50}
						className='size-10 mr-2'
					/>
					<span className='text-sm font-medium capitalize'>{conference.full}</span>
				</div>
			))}
			{filteredTeams.length === 0 && filteredConferences.length === 0 && <div className='p-2 text-gray-500'>No results found</div>}
		</div>
	);
}
