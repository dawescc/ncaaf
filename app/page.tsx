import Top25 from "@/components/rankings/top-25";
import { Container } from "@/components/ui/container";

export default async function Home() {
	return (
		<Container>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.66fr] gap-8'>
				<div className='pt-4 h-fit'>{/* <Scoreboard /> */}</div>
				<div className='lg:col-span-2 grid grid-cols-subgrid gap-8'>
					<div className='pt-4 h-fit'>
						<Top25 />
					</div>
					{/* more */}
				</div>
			</div>
		</Container>
	);
}
