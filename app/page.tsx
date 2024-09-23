import { FaSmileBeam } from "react-icons/fa";

export default async function Home() {
	return (
		<div className=''>
			<main className='px-2 py-4'>
				<div className='px-10 py-20 flex flex-col space-y-4'>
					<h1 className='font-bold text-3xl font-serif'>Hello</h1>
					<p>This is an app that makes it easy to look at CFB Div I conference and teams.</p>
					<p>
						Other things will be added in the future.
						<FaSmileBeam className='inline ml-1' />
					</p>
				</div>
			</main>
		</div>
	);
}
