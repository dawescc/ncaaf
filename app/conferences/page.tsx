import ConferenceList from "@/components/confList";

const ConferencesPage = () => {
	return (
		<div className='px-10 py-20 flex flex-col space-y-4'>
			<h1 className='font-bold text-3xl font-serif'>Conferences</h1>
			<ConferenceList />
		</div>
	);
};

export default ConferencesPage;
