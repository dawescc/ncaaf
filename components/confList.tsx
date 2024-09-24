import Link from "next/link";
import Image from "next/image";
import { conferences } from "@/data/teams";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table";

const ConferenceList = () => {
	return (
		<Table>
			<TableTitle>Conferences</TableTitle>
			<TableHeader>
				<TableRow>
					<TableHead>FBS Division I Conferences</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(conferences).map(([slug, conference]) => (
					<TableRow key={slug}>
						<TableCell>
							<Link
								href={`/conferences/${slug}`}
								className='flex items-center'>
								<Image
									src={conference.href}
									alt={`${conference.full} logo`}
									width={32}
									height={32}
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
