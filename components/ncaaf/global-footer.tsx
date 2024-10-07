import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import MadeWithLove from "./mwl";

const linkItems = Object.entries(siteConfig.links).map(([name, href]) => ({
	name: name.charAt(0).toUpperCase() + name.slice(1),
	href,
}));

export default function GlobalFooter() {
	return (
		<footer className='py-6 md:px-8 md:py-1.5 text-sm'>
			<div className='container flex flex-col items-center justify-between gap-4 md:flex-row mb-4 md:mb-0'>
				<p className='text-balance text-center leading-loose text-muted-foreground md:text-left font-bold tracking-tight font-serif text-base'>
					That boy don&apos;t know the meaning of the word fear. In fact, I just saw his grades, and that boy don&apos;t know the meaning of a lot of
					words.
				</p>
				<div className='flex space-x-2'>
					{linkItems.map((link, index) => (
						<Link
							key={index}
							href={link.href}
							className={cn("items-center py-1 hover:underline text-muted-foreground")}
							target='_blank'
							rel='noopener noreferrer'>
							{link.name}
						</Link>
					))}
				</div>
			</div>

			<div className='container flex flex-col items-center justify-between gap-4 md:flex-row text-xs font-light'>
				<p className='text-balance text-center leading-loose text-muted-foreground md:text-left'>
					Not affiliated with NCAA or any other institution mentioned within. All rights belong to their owners.
				</p>
				<p className='text-balance text-center align-bottom leading-loose text-muted-foreground/80 md:text-left tracking-tight font-serif'>
					<MadeWithLove className='size-10' />
				</p>
			</div>
		</footer>
	);
}
