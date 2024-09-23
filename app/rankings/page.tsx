import Top25 from "@/components/apRankings";

export default async function Page() {
	return (
		<div className='px-10 py-20 flex flex-col space-y-4'>
			<h1 className='font-bold text-3xl font-serif'>AP Top 25</h1>
			<Top25 />
		</div>
	);
}
