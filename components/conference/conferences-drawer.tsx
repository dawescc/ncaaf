"use client";

import { Drawer } from "vaul";
import ConferenceList from "@/components/conference/conference-list";

export default function ConferencesDrawer() {
	return (
		<Drawer.Root direction='right'>
			<Drawer.Trigger className=''>Conferences</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40 z-[99]' />
				<Drawer.Content className='right-0 top-0 bottom-0 fixed z-[100] flex outline-none'>
					<div className='rounded-lg border bg-card text-card-foreground shadow-sm grow mt-2 mr-2 mb-2 p-5 flex flex-col overflow-y-auto'>
						<div className='max-w-md mx-auto'>
							<div className='mb-2'>
								<Drawer.Title className='font-medium mb-2'>Conferences</Drawer.Title>
								<ConferenceList />
							</div>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
