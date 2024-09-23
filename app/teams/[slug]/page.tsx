import { teams } from "@/data/teams";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
	const localTeamData = Object.values(teams).find((t) => t.slug === params.slug);

	if (!localTeamData) {
		return (
			<div className='px-10 py-20 flex flex-col space-y-4'>
				<h1 className='font-bold text-3xl font-serif'>Team not found.</h1>
				<Link
					href={"/"}
					className='hover:underline'>
					Go home
				</Link>
			</div>
		);
	}

	return <div className='flex flex-col gap-2 max-w-4xl mx-auto'>Hi</div>;
}
