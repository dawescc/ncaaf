import Link from "next/link";
import { conferences } from "@/data/conferences";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface Props {
	logo_s?: number;
}

const ConferenceList = ({ logo_s }: Props) => {
	const sortedConferences = Object.entries(conferences).sort(([, a], [, b]) => a.full.localeCompare(b.full));

	return (
		<div className='w-full text-sm'>
			<div className={cn("pb-4")}>
				{sortedConferences.map(([slug, conference]) => (
					<Link
						key={slug}
						href={`/conferences/${slug}`}
						className='group flex w-full items-center border border-transparent px-2 py-1.5 hover:underline text-muted-foreground'>
						<Image
							src={conference.href}
							alt={`${conference.full} logo`}
							width={logo_s || 20}
							height={logo_s || 20}
							className='mr-4'
						/>
						<span className='font-medium'>{conference.full}</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ConferenceList;
