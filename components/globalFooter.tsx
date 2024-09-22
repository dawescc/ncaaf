import Link from "next/link";
import Image from "next/image";
import { BsHeartFill } from "react-icons/bs";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const navItems = [
	{ name: "dawes.cc", href: "https://dawes.cc" },
	{ name: "github", href: "https://github.com/dawescc" },
	{ name: "twitter", href: "https://twitter.com/dawescc" },
];

export default function GlobalFooter() {
	return (
		<footer className='bg-gray-100 border-gray-300 border-t-2'>
			<div className='flex min-h-[75dvh] mx-auto py-10'>
				<div className='flex flex-col max-w-3xl mx-auto'>
					<div className='flex flex-col gap-10 sm:gap-0 sm:flex-row'>
						<div className='sm:w-1/2 px-2'>
							<span className='font-serif font-bold text-2xl text-balance leading-9 tracking-wide aspect-square'>
								<FaQuoteLeft className='inline mx-2' />
								That boy don’t know the meaning of the word fear. In fact, I just saw his grades, and that boy don’t know the meaning of a lot
								of words.
								<FaQuoteRight className='inline mx-2' />
							</span>
						</div>
						<div className='sm:ml-auto sm:mr-4 px-2'>
							<div className='text-lg grid grid-cols-1 max-w-fit'>
								<span className='text-xl font-serif font-bold'>Links</span>
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
					<div className='mt-auto flex justify-center border-gray-300 border-t-2 pt-2'>
						<span className='text-gray-400'>
							designed && developed with <BsHeartFill className='inline-flex' />
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
