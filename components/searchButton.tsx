"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { teams, conferences } from "@/data/teams";
import SearchResult from "@/components/searchResult";

export function Search() {
	const [searchTerm, setSearchTerm] = useState("");

	const handleDrawerClose = () => {
		setSearchTerm("");
	};

	return (
		<Drawer.Root onOpenChange={handleDrawerClose}>
			<Drawer.Trigger asChild>
				<button>
					<FaSearch />
				</button>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40' />
				<Drawer.Content className='bg-white flex flex-col fixed bottom-0 left-0 right-0 h-full max-h-[96%] rounded-t-[10px] z-[100]'>
					<div className='max-w-2xl w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]'>
						<Drawer.Trigger asChild>
							<button className='ml-auto'>
								<FaWindowClose />
							</button>
						</Drawer.Trigger>
						<input
							className='border border-gray-400 my-8 p-2 rounded'
							placeholder='Search for teams or conferences...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							autoFocus
						/>
						<SearchResult
							searchTerm={searchTerm}
							teams={teams}
							conferences={conferences}
						/>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
