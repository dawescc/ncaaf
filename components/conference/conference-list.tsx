import Link from "next/link";
import Image from "next/image";
import { conferences } from "@/data/conferences";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ConferenceList = () => {
	const sortedConferences = Object.entries(conferences).sort(([, a], [, b]) => a.full.localeCompare(b.full));

	return (
		<Table className='font-mono'>
			<TableHeader>
				<TableRow>
					<TableHead>FBS Division I Conferences</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedConferences.map(([slug, conference]) => (
					<TableRow key={slug}>
						<TableCell>
							<Link
								href={`/conferences/${slug}`}
								className='flex items-center'>
								<Image
									src={conference.href}
									alt={`${conference.full} logo`}
									width={16}
									height={16}
									className='mr-4'
								/>
								<span className='font-medium'>{conference.full}</span>
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ConferenceList;
