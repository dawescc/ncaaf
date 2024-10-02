"use client";

import { Drawer } from "vaul";
import TeamList from "@/components/team/team-list";

export default function ConferencesDrawer() {
	return (
		<Drawer.Root direction='right'>
			<Drawer.Trigger className=''>Teams</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40 z-[99]' />
				<Drawer.Content className='right-0 top-0 bottom-0 fixed z-[100] flex outline-none'>
					<div className='rounded-lg border bg-card text-card-foreground shadow-sm grow mt-2 mr-2 mb-2 p-5 flex flex-col overflow-y-auto'>
						<div className='max-w-md mx-auto'>
							<Drawer.Title className='font-medium mb-2 section-header-text'>Teams</Drawer.Title>
							<Drawer.Description className='mb-2'>
								<TeamList />
							</Drawer.Description>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
