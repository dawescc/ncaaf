"use client";

import { Suspense } from "react";
import EspnNews from "@/components/espn-news";
import { Skeleton } from "@/components/ui/skeleton";

const limit = 20;

export default function NewsContent() {
	const SkeletonList = () => {
		const skeletons = [];

		for (let i = 0; i < limit; i++) {
			skeletons.push(
				<Skeleton
					key={i}
					className='w-dvw h-4 mb-4'
				/>
			);
		}

		return skeletons;
	};

	return (
		<>
			<Suspense fallback={<SkeletonList />}>
				<EspnNews
					groupId={80}
					limit={limit}
				/>
			</Suspense>
		</>
	);
}
