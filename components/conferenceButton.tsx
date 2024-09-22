import Image from "next/image";
import Link from "next/link";

interface ConferenceButtonProps {
	id: string;
	full: string;
	href: string;
}

export default function ConferenceButton({ id, full, href }: ConferenceButtonProps) {
	return (
		<Link
			href={`/conferences/${id}`}
			className='flex flex-col justify-center items-center text-center rounded-lg px-4 py-2 bg-slate-100 hover:bg-slate-200'>
			<Image
				src={href}
				alt={`${full} logo`}
				height={100}
				width={100}
				className='size-20'
			/>
			<span className='font-black flex gap-1 items-baseline text-slate-700 text-sm lg:text-xl'>{full}</span>
		</Link>
	);
}
