"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { teams } from "@/data/teams";
import { conferences } from "@/data/conferences";
import { PiBinocularsFill } from "react-icons/pi";

export function CommandMenu({ ...props }: DialogProps) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
				if (
					(e.target instanceof HTMLElement && e.target.isContentEditable) ||
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement ||
					e.target instanceof HTMLSelectElement
				) {
					return;
				}

				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	const filteredTeams = Object.values(teams).filter((team) => team.displayName.toLowerCase().includes(search.toLowerCase()));

	const filteredConferences = Object.values(conferences).filter((conference) => conference.full.toLowerCase().includes(search.toLowerCase()));

	return (
		<>
			<Button
				variant='outline'
				className={cn(
					"relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
				)}
				onClick={() => setOpen(true)}
				{...props}>
				<span className='hidden lg:inline-flex'>Search teams or conferences...</span>
				<span className='inline-flex lg:hidden'>Search...</span>
				<kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
					<span className='text-xs'>
						<PiBinocularsFill />
					</span>
				</kbd>
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}>
				<CommandInput
					placeholder='Type a command or search...'
					value={search}
					onValueChange={setSearch}
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{filteredTeams.length > 0 && (
						<CommandGroup heading='Teams'>
							{filteredTeams.map((team) => (
								<CommandItem
									key={team.id}
									value={team.displayName}
									onSelect={() => {
										runCommand(() => router.push(`/teams/${team.slug}`));
									}}>
									{team.displayName}
								</CommandItem>
							))}
						</CommandGroup>
					)}
					{filteredTeams.length > 0 && filteredConferences.length > 0 && <CommandSeparator />}
					{filteredConferences.length > 0 && (
						<CommandGroup heading='Conferences'>
							{filteredConferences.map((conference) => (
								<CommandItem
									key={conference.id}
									value={conference.full}
									onSelect={() => {
										runCommand(() => router.push(`/conferences/${conference.slug}`));
									}}>
									{conference.full}
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
}
