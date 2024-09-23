import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const linkItems = [
	{ name: "dawes.cc", href: "https://dawes.cc" },
	{ name: "github", href: "https://github.com/dawescc" },
	{ name: "twitter", href: "https://twitter.com/dawescc" },
];
const navItems = [
	{ name: "AP Top 25", href: "/rankings" },
	{ name: "conferences", href: "/conferences" },
	{ name: "teams", href: "/teams" },
];

export default function GlobalFooter() {
	return (
		<footer className='bg-gray-100 border-gray-300 border-t-2'>
			<div className='flex min-h-[75dvh] md:min-h-[60dvh] mx-auto py-10'>
				<div className='flex flex-col max-w-3xl mx-auto'>
					<div className='flex flex-col gap-10 sm:gap-0 sm:flex-row px-4 '>
						<span className='sm:w-1/2 text-2xl font-serif font-bold'>
							<FaQuoteLeft className='inline mr-2 font-base' />
							That boy don’t know the meaning of the word fear. In fact, I just saw his grades, and that boy don’t know the meaning of a lot of
							words.
							<FaQuoteRight className='inline ml-2' />
						</span>
						<div className='sm:w-1/2 flex justify-evenly'>
							<div className='text-lg grid grid-cols-1 max-w-fit'>
								<span className='text-xl font-serif font-bold'>Links</span>
								{linkItems.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={`hover:underline`}>
										{item.name}
									</Link>
								))}
							</div>
							<div className='text-lg grid grid-cols-1 max-w-fit'>
								<span className='text-xl font-serif font-bold'>Navigation</span>
								{navItems.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={`hover:underline`}>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className='mt-auto flex justify-center'>
						<span className='text-gray-400 text-xs'>
							designed && developed with <BsHeartFill className='inline-flex' />
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
