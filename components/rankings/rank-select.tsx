// components/RankingsPage.tsx
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Suspense, useState } from "react";
import Top25 from "@/components/rankings/top-25";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Rank = "ap" | "cfp";

export function Rankings() {
	const [rank, setRank] = useState<Rank>("cfp");

	return (
		<div className='space-y-4'>
			<Select
				value={rank}
				onValueChange={(value: Rank) => setRank(value)}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Select Rankings' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='ap'>AP Poll</SelectItem>
					<SelectItem value='cfp'>College Football Playoff</SelectItem>
				</SelectContent>
			</Select>

			<Suspense fallback={<RankingsLoading />}>
				<Top25 rank={rank} />
			</Suspense>
		</div>
	);
}

const RankingsLoading = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Rank</TableHead>
					<TableHead>Team</TableHead>
					<TableHead>W</TableHead>
					<TableHead>L</TableHead>
					<TableHead className='text-right'>Conf</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{[...Array(25)].map((_, i) => (
					<TableRow key={i}>
						<TableCell>
							<div className='select-none bg-muted text-transparent animate-pulse w-fit'>0</div>
						</TableCell>
						<TableCell>
							<div className='flex items-center gap-2'>
								<div className='h-5 w-5 bg-muted animate-pulse rounded' />
								<div className='select-none bg-muted text-transparent animate-pulse'>Tennessee Volunteers</div>
							</div>
						</TableCell>
						<TableCell>
							<div className='select-none bg-muted text-transparent animate-pulse'>0</div>
						</TableCell>
						<TableCell>
							<div className='select-none bg-muted text-transparent animate-pulse'>0</div>
						</TableCell>
						<TableCell className='text-right'>
							<div className='select-none bg-muted text-transparent animate-pulse'>0-0</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableCaption className='font-sans'>
				<div className='select-none bg-muted text-transparent animate-pulse'>Loading rankings...</div>
			</TableCaption>
		</Table>
	);
};
