import Image from "next/image";
import Link from "next/link";

interface TeamDetailProps {
	team: {
		displayName: string;
		color: string;
		alternateColor?: string;
		logos: { href: string }[];
		standingSummary: string;
		record: { items: { summary: string }[] };
		rank?: number;
	};
	isDarkMode: boolean;
	conferenceDisplay: string;
	conferenceId: string;
}

const TeamDetail: React.FC<TeamDetailProps> = ({ team, isDarkMode, conferenceDisplay, conferenceId }) => {
	const color = `#${team.color}`;
	const logoUrl = isDarkMode && team.logos.length > 1 ? team.logos[1].href : team.logos[0].href;
	const rank = team.rank;

	return (
		<div className='overflow-hidden'>
			<div
				className='p-6 flex items-center'
				style={{ borderBottom: `4px solid ${color}` }}>
				<Image
					src={logoUrl}
					alt={`${team.displayName} logo`}
					height={80}
					width={80}
				/>
				<div className='ml-6'>
					<h1
						className='text-3xl font-bold mb-1'
						style={{ color }}>
						{rank ? `#${rank} ` : ""}
						{team.displayName}
					</h1>
					<Link
						href={`/?conferences=${conferenceId}`}
						className='mb-1 hover:underline'>
						{conferenceDisplay}
					</Link>
					<p className='text-sm text-gray-500 dark:text-gray-400'>{team.record.items[0].summary}</p>
				</div>
			</div>
		</div>
	);
};

export default TeamDetail;
