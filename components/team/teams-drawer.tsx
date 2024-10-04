"use client";

import { Drawer } from "vaul";
import TeamList from "@/components/team/team-list";
import { PiFootballHelmetFill } from "react-icons/pi";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ConferencesDrawer() {
	return (
		<Drawer.Root direction='right'>
			<Drawer.Trigger asChild>
				<div
					className={cn(
						buttonVariants({
							variant: "ghost",
						}),
						"h-8 w-8 px-0"
					)}>
					<PiFootballHelmetFill className='h-4 w-4' />
					<span className='sr-only'>Teams</span>
				</div>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40 z-[99]' />
				<Drawer.Content className='right-0 top-0 bottom-0 fixed z-[100] flex outline-none'>
					<div className='rounded-lg border bg-card text-card-foreground shadow-sm grow mt-2 mr-2 mb-2 p-5 flex flex-col overflow-y-auto'>
						<div className='max-w-md mx-auto'>
							<div className='mb-2'>
								<Drawer.Title className='font-medium mb-2'>Teams</Drawer.Title>
								<TeamList />
							</div>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
