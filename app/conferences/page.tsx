import ConferenceButton from "@/components/conferenceButton";
import { conferences } from "@/data/teams";

export default function Conferences() {
	return (
		<div className=''>
			<main className='px-2 py-4 max-w-3xl mx-auto'>
				<div className='grid grid-cols-2 gap-3'>
					{Object.values(conferences).map((conference) => (
						<ConferenceButton
							key={conference.id}
							id={conference.id}
							full={conference.full}
							href={conference.href}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
