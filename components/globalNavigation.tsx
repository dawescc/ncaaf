import Link from "next/link";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Logo from "./logo";

export function GlobalNavigation() {
	return (
		<div className='px-2 py-1 z-[50] fixed bg-background flex w-full shadow-sm border-b-[1px]'>
			<div className='font-serif font-bold mr-auto'>
				<Link href={"/"}>
					<Logo className='size-14 md:size-16' />
				</Link>
			</div>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							href='/conferences'
							legacyBehavior
							passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Conferences</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							href='/teams'
							legacyBehavior
							passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>Teams</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							href='/rankings'
							legacyBehavior
							passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>AP 25</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
