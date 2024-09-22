import Image from "next/image";
import Link from "next/link";

interface TeamButtonProps {
	id: string;
}

export default async function TeamButton({ id }: TeamButtonProps) {
	const res = await fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${id}/`);
	if (!res.ok) {
		throw new Error(`Failed to fetch data: ${res.statusText}`);
	}
	const data = await res.json();
	const team = data.team;

	return (
		<Link
			href={`teams/${team.id}`}
			className='flex flex-col justify-center items-center text-center rounded-lg px-4 py-2 bg-slate-100 hover:bg-slate-200'>
			<Image
				src={team.logos[0].href}
				alt={`${team.displayName} logo`}
				height={100}
				width={100}
				className='size-20'
			/>
			<span className='font-black text-slate-700 text-sm lg:text-xl'>
				{data.team.rank && <span className='font-medium'>{data.team.rank}&nbsp;</span>}
				<span className=''>{data.team.displayName}</span>
			</span>
		</Link>
	);
}
