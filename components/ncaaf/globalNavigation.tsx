import Link from "next/link";

import Logo from "@/components/ncaaf/logo";

import { CommandMenu } from "@/components/ncaaf/globalSearch";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { FaGithubAlt } from "react-icons/fa";
import { siteConfig } from "@/config/siteConfig";
import TeamsDrawer from "../team/teams-drawer";

export function GlobalNavigation() {
	return (
		<header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 max-w-screen-2xl items-center px-2 lg:px-4'>
				<div className='mr-0 lg:mr-4 flex'>
					<Link
						href='/'
						className='mr-2 lg:mr-4 flex items-center p-1'>
						<Logo className='max-h-10 w-auto' />
					</Link>
				</div>
				<div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
					<div className='w-full flex-1 md:w-auto md:flex-none'>
						<CommandMenu />
					</div>
					<nav className='flex items-center'>
						<Link
							href={siteConfig.links.github}
							target='_blank'
							rel='noreferrer'>
							<div
								className={cn(
									buttonVariants({
										variant: "ghost",
									}),
									"h-8 w-8 px-0"
								)}>
								<FaGithubAlt className='h-4 w-4' />
								<span className='sr-only'>Twitter</span>
							</div>
						</Link>
						<div className='md:hidden'>
							<TeamsDrawer />
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
