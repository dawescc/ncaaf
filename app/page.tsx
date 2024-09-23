import Top25 from "@/components/apRankings";
import ConferenceList from "@/components/confList";

export default async function Home() {
	return (
		<div className='px-5 py-10 flex flex-col space-y-4'>
			<div className='flex flex-col md:flex-row md:flex-wrap gap-4'>
				<div className='flex flex-col gap-2'>
					<h2 className='font-bold text-2xl font-serif'>AP Top 25</h2>
					<Top25 />
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='font-bold text-2xl font-serif'>Conferences</h2>
					<ConferenceList />
				</div>
			</div>
		</div>
	);
}
