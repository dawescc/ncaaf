import Link from "next/link";
import { conferences } from "@/data/teams";

export default async function ConferencePage({ params }: { params: { slug: string } }) {
	const conferenceId = params.slug;

	const conferenceInfo = conferences[conferenceId];

	if (!conferenceInfo) {
		return (
			<div className='px-10 py-20 flex flex-col space-y-4'>
				<h1 className='font-bold text-3xl font-serif'>Conference not found.</h1>
				<Link
					href={"/"}
					className='hover:underline'>
					Go home
				</Link>
			</div>
		);
	}

	return <div className='flex flex-col space-y-3 max-w-xl mx-auto'>Hi</div>;
}
