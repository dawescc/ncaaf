import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TeamLogo from "@/components/team/team-logo";
import Image from "next/image";

interface GroupPlayerStatsProps {
	group?: number;
}

interface Athlete {
	position: {
		abbreviation: string;
	};
	id: string;
	lastName: string;
	firstName: string;
	shortName: string;
	fullName: string;
	headshot: { alt: string; href: string };
	links: { href: string; rel: string[] }[];
	displayName: string;
}

interface Team {
	displayName: string;
	abbreviation: string;
	slug: string;
	id: string;
	logos: { href: string }[];
	links: { href: string; rel: string[] }[];
}

interface Leader {
	athlete: Athlete;
	displayValue: string;
	team: Team;
}

interface Category {
	abbreviation: string;
	displayName: string;
	leaders: Leader[];
}

async function fetchGroupPlayerStats(group: number): Promise<Category[]> {
	const response = await fetch(
		`https://site.web.api.espn.com/apis/site/v3/sports/football/college-football/leaders?&group=${group}`,
		{ next: { revalidate: 28800 } } // Revalidate every 8 hours
	);

	if (!response.ok) throw new Error("Failed to fetch data");

	const data = await response.json();
	return data.leaders.categories;
}

const GroupPlayerStats = async ({ group = 80 }: GroupPlayerStatsProps) => {
	try {
		const categories = await fetchGroupPlayerStats(group);

		// Define offense and defense categories
		const offenseCategories = categories.filter((category) =>
			["passing yards", "rushing yards", "receiving yards"].includes(category.displayName.toLowerCase())
		);

		const defenseCategories = categories.filter((category) => ["sacks", "interceptions", "total tackles"].includes(category.displayName.toLowerCase()));

		return (
			<Tabs
				defaultValue='offense'
				className='w-full'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='offense'>Offense</TabsTrigger>
					<TabsTrigger value='defense'>Defense</TabsTrigger>
				</TabsList>

				<TabsContent value='offense'>
					{offenseCategories.map((category) => (
						<Table
							key={category.abbreviation}
							className='mb-8 caption-top'>
							<TableCaption className=''>{category.displayName}</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='text-left'>Conf Rank</TableHead>
									<TableHead>Pos.</TableHead>
									<TableHead>Player</TableHead>
									<TableHead>Team</TableHead>
									<TableHead className='text-right'>Stat</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{category.leaders.map((leader, index) => (
									<TableRow key={leader.athlete.id}>
										<TableCell className='text-left'>{index + 1}</TableCell>
										<TableCell>{leader.athlete.position.abbreviation}</TableCell>
										<TableCell>
											<Link
												href={leader.athlete.links.find((link) => link.rel.includes("playercard"))?.href || "#"}
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center gap-2 hover:underline'>
												<Image
													src={leader.athlete.headshot.href}
													alt={leader.athlete.headshot.alt}
													width={20}
													height={20}
													className='rounded-full'
												/>
												{leader.athlete.fullName}
											</Link>
										</TableCell>
										<TableCell>
											<Link
												href={`/teams/${leader.team.slug}`}
												rel='noopener noreferrer'
												className='flex items-center gap-2 hover:underline'>
												<TeamLogo
													id={leader.team.id}
													alt={leader.team.displayName}
													width={20}
													height={20}
												/>
												{leader.team.abbreviation}
											</Link>
										</TableCell>
										<TableCell className='text-right'>{leader.displayValue}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					))}
				</TabsContent>

				<TabsContent value='defense'>
					{defenseCategories.map((category) => (
						<Table
							key={category.abbreviation}
							className='mb-8 caption-top'>
							<TableCaption className=''>{category.displayName}</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='text-left'>Conf Rank</TableHead>
									<TableHead>Pos.</TableHead>
									<TableHead>Player</TableHead>
									<TableHead>Team</TableHead>
									<TableHead className='text-right'>Stat</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{category.leaders.map((leader, index) => (
									<TableRow key={leader.athlete.id}>
										<TableCell className='text-left'>{index + 1}</TableCell>
										<TableCell>{leader.athlete.position.abbreviation}</TableCell>
										<TableCell>
											<Link
												href={leader.athlete.links.find((link) => link.rel.includes("playercard"))?.href || "#"}
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center gap-2 hover:underline'>
												<Image
													src={leader.athlete.headshot.href}
													alt={leader.athlete.headshot.alt}
													width={20}
													height={20}
													className='rounded-full'
												/>
												{leader.athlete.fullName}
											</Link>
										</TableCell>
										<TableCell>
											<Link
												href={`/teams/${leader.team.slug}`}
												rel='noopener noreferrer'
												className='flex items-center gap-2 hover:underline'>
												<TeamLogo
													id={leader.team.id}
													alt={leader.team.displayName}
													width={20}
													height={20}
												/>
												{leader.team.abbreviation}
											</Link>
										</TableCell>
										<TableCell className='text-right'>{leader.displayValue}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					))}
				</TabsContent>
			</Tabs>
		);
	} catch (error) {
		console.error("Failed to fetch player stats:", error);
		return <div>Failed to load player stats. Please try again later.</div>;
	}
};

export default GroupPlayerStats;