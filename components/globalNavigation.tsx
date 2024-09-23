import Link from "next/link";

const navItems = [
	{ name: "Conferences", href: "/conferences" },
	{ name: "Teams", href: "/teams" },
	{ name: "AP 25", href: "/rankings" },
];

export default function GlobalNavigation() {
	return (
		<header className='sticky top-0 z-50 bg-white border-gray-300 border-b-2'>
			<nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center bg-black text-white px-1'>
						<Link
							href='/'
							className={`text-2xl font-black font-serif`}>
							NCAAF
						</Link>
					</div>
					<div className='flex items-baseline space-x-4'>
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`px-3 py-2 rounded-md text-sm font-medium hover:underline`}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			</nav>
		</header>
	);
}
