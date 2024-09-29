"use client";

import { Suspense } from "react";
import TeamLogo from "@/components/team/teamLogo";
import { Skeleton } from "@/components/ui/skeleton";

type ClientTeamLogoProps = {
	teamId: number;
	width?: number;
	height?: number;
	className?: string;
};

export default function ClientTeamLogo({ teamId, width, height, className }: ClientTeamLogoProps) {
	return (
		<Suspense fallback={<Skeleton className='size-[40px] rounded-md' />}>
			<TeamLogo
				teamId={teamId}
				width={width}
				height={height}
				className={className}
			/>
		</Suspense>
	);
}
