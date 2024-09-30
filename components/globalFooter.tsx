import Link from "next/link";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Logo from "./logo";
import { siteConfig } from "@/lib/siteConfig";
import MadeWithLove from "@/components/mwl";

const linkItems = Object.entries(siteConfig.links).map(([name, href]) => ({
	name: name.charAt(0).toUpperCase() + name.slice(1),
	href,
}));

const navItems = [
	{ name: "AP 25", href: "/rankings" },
	{ name: "Conferences", href: "/conferences" },
	{ name: "Teams", href: "/teams" },
];

export default function GlobalFooter() {
	return (
		<footer className='bg-footer border-t-[1px]'>
			<div className='min-h-[75dvh] md:min-h-[60dvh] mx-auto py-10 px-4 flex flex-col justify-between'>
				<div className='max-w-6xl mx-auto w-full flex-grow flex flex-col justify-center'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center'>
						<div className='flex justify-center md:justify-start'>
							<Logo />
						</div>

						<div className='text-center md:text-left'>
							<blockquote className='text-xl md:text-2xl font-serif font-bold'>
								<FaQuoteLeft className='inline-block mr-2' />
								That boy don&#39;t know the meaning of the word fear. In fact, I just saw his grades, and that boy don&#39;t know the meaning of
								a lot of words.
								<FaQuoteRight className='inline-block ml-2' />
							</blockquote>
						</div>

						<div className='flex justify-center md:justify-end'>
							<div className='grid grid-cols-2 gap-8 text-center md:text-left'>
								<div>
									<h3 className='text-xl font-serif font-bold mb-2'>Links</h3>
									<ul>
										{linkItems.map((item) => (
											<li key={item.name}>
												<Link
													href={item.href}
													className='hover:underline'>
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div>
									<h3 className='text-xl font-serif font-bold mb-2'>Navigation</h3>
									<ul>
										{navItems.map((item) => (
											<li key={item.name}>
												<Link
													href={item.href}
													className='hover:underline'>
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-8 text-center flex flex-col'>
					<MadeWithLove className='h-auto w-24 mx-auto filter drop-shadow-sm' />
					<span className='text-xs font-light mt-8 opacity-80'>
						Not affiliated with NCAA or any other institution mentioned within. All rights belong to their owners.
					</span>
				</div>
			</div>
		</footer>
	);
}
