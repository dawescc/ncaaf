import Link from "next/link";
import Image from "next/image";
import { conferences } from "@/data/teams";

const ConferenceList = () => {
	return (
		<div className='overflow-x-auto border-gray-200/50 border-[1px] shadow-sm rounded-lg'>
			<ul className='divide-y divide-gray-200'>
				{Object.entries(conferences).map(([slug, conference]) => (
					<li
						key={slug}
						className='px-2 py-4 sm:px-6 flex items-center'>
						<Link
							href={`/conferences/${slug}`}
							className='flex items-center space-x-3 hover:underline'>
							<Image
								src={conference.href}
								alt={`${conference.full} logo`}
								width={32}
								height={32}
								className='mr-4'
							/>
							<span className='font-medium text-gray-900'>{conference.full}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ConferenceList;
