import Link from "next/link";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Logo from "@/components/ncaaf/logo";
import ConferencesDrawer from "@/components/conference/conferences-drawer";
import TeamsDrawer from "@/components/team/teams-drawer";
import { CommandMenu } from "@/components/ncaaf/globalSearch";

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
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<ConferencesDrawer />
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<TeamsDrawer />
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<div className='w-full flex-1 md:w-auto md:flex-none'>
							<CommandMenu />
						</div>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
