import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

interface Team {
	id: string;
	slug: string;
}

interface Conference {
	id: string;
	short: string;
	full: string;
	href: string;
}

interface SearchResultsProps {
	searchTerm: string;
	teams: Record<string, Team>;
	conferences: Record<string, Conference>;
	onResultClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

function formatName(name: string): string {
	return name
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export default function SearchResult({ searchTerm, teams, conferences, onResultClick }: SearchResultsProps) {
	const filteredTeams = Object.values(teams).filter((team) => team.slug.toLowerCase().includes(searchTerm.toLowerCase()));

	const filteredConferences = Object.values(conferences).filter((conference) =>
		[conference.short, conference.full, conference.id].some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	if (!searchTerm) {
		return null;
	}

	return (
		<div className='flex flex-col space-y-2 p-2 max-h-full overflow-y-auto'>
			{filteredTeams.map((team) => (
				<Link
					key={team.id}
					href={`/teams/${team.id}`}
					className='flex items-center p-2'
					onClick={onResultClick}>
					<Image
						src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${team.id}.png`}
						alt={`${team.slug} logo`}
						height={50}
						width={50}
						className='size-10 mr-2'
					/>
					<span className='text-sm font-medium capitalize'>{formatName(team.slug)}</span>
				</Link>
			))}
			{filteredConferences.map((conference) => (
				<Link
					href={`/conferences/${conference.id}`}
					key={conference.id}
					className='flex items-center p-2'
					onClick={onResultClick}>
					<Image
						src={conference.href}
						alt={`${conference.full} logo`}
						height={50}
						width={50}
						className='size-10 mr-2'
					/>
					<span className='text-sm font-medium capitalize'>{conference.full}</span>
				</Link>
			))}
			{filteredTeams.length === 0 && filteredConferences.length === 0 && <div className='p-2 text-gray-500'>No results found</div>}
		</div>
	);
}
